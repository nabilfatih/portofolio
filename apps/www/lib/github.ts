import {
  Context,
  Effect,
  Array as EffectArray,
  Layer,
  Option,
  Order,
  Schema,
} from "effect";
import { parse } from "node-html-parser";

const CONTRIBUTIONS_URL = "https://github.com/users/nabilfatih/contributions";
const CONTRIBUTIONS_CACHE_SECONDS = 60 * 60;
const CONTRIBUTION_HEADING_SELECTOR = "#js-contribution-activity-description";
const CONTRIBUTION_DAY_SELECTOR =
  "td.ContributionCalendar-day[data-date][data-level]";

const NonNegativeInteger = Schema.Number.pipe(
  Schema.int(),
  Schema.nonNegative()
);
const GitHubContributionLevelSchema = Schema.Literal(0, 1, 2, 3, 4);
const GitHubContributionDaySchema = Schema.Struct({
  date: Schema.String.pipe(Schema.pattern(/^\d{4}-\d{2}-\d{2}$/)),
  level: GitHubContributionLevelSchema,
});
const GitHubContributionSummarySchema = Schema.Struct({
  days: Schema.Array(GitHubContributionDaySchema),
  total: NonNegativeInteger,
});

export type GitHubContributionDay = typeof GitHubContributionDaySchema.Type;
export type GitHubContributionLevel = typeof GitHubContributionLevelSchema.Type;
export type GitHubContributionSummary =
  typeof GitHubContributionSummarySchema.Type;

export class GitHubContributionTransportError extends Schema.TaggedError<GitHubContributionTransportError>()(
  "GitHubContributionTransportError",
  {
    cause: Schema.Unknown,
    message: Schema.String,
    operation: Schema.Literal("request", "read-body"),
  }
) {}

export class GitHubContributionResponseError extends Schema.TaggedError<GitHubContributionResponseError>()(
  "GitHubContributionResponseError",
  {
    message: Schema.String,
    status: Schema.Number,
  }
) {}

export class GitHubContributionParseError extends Schema.TaggedError<GitHubContributionParseError>()(
  "GitHubContributionParseError",
  {
    message: Schema.String,
  }
) {}

type GitHubContributionSourceError =
  | GitHubContributionResponseError
  | GitHubContributionTransportError;

export class GitHubContributionSource extends Context.Tag(
  "@/lib/github/GitHubContributionSource"
)<
  GitHubContributionSource,
  {
    readonly read: Effect.Effect<string, GitHubContributionSourceError>;
  }
>() {}

const readGitHubContributionHtml = Effect.fn("www.github.readContributionHtml")(
  function* () {
    const response = yield* Effect.tryPromise({
      catch: (cause) =>
        new GitHubContributionTransportError({
          cause,
          message: "Failed to request the GitHub contribution summary.",
          operation: "request",
        }),
      try: () =>
        fetch(CONTRIBUTIONS_URL, {
          headers: {
            Accept: "text/html",
            "User-Agent": "nabilfatih.com",
          },
          next: { revalidate: CONTRIBUTIONS_CACHE_SECONDS },
        }),
    });

    if (!response.ok) {
      return yield* new GitHubContributionResponseError({
        message: "GitHub returned an unsuccessful contribution response.",
        status: response.status,
      });
    }

    return yield* Effect.tryPromise({
      catch: (cause) =>
        new GitHubContributionTransportError({
          cause,
          message: "Failed to read the GitHub contribution response.",
          operation: "read-body",
        }),
      try: () => response.text(),
    });
  }
);

export const GitHubContributionSourceLive = Layer.succeed(
  GitHubContributionSource,
  {
    read: readGitHubContributionHtml(),
  }
);

const parseGitHubContributionDocument = Effect.fn(
  "www.github.parseContributionDocument"
)(function* (html: string) {
  return yield* Effect.try({
    catch: () =>
      new GitHubContributionParseError({
        message: "GitHub contribution markup could not be parsed.",
      }),
    try: () => parse(html),
  });
});

const parseGitHubContributionTotal = Effect.fn(
  "www.github.parseContributionTotal"
)(function* (headingText: string) {
  const totalText = headingText.trim().split(" ").at(0)?.replaceAll(",", "");

  if (!totalText) {
    return yield* new GitHubContributionParseError({
      message: "GitHub contribution total was not found.",
    });
  }

  return yield* Schema.decodeUnknown(NonNegativeInteger)(
    Number(totalText)
  ).pipe(
    Effect.mapError(
      () =>
        new GitHubContributionParseError({
          message: "GitHub contribution total was invalid.",
        })
    )
  );
});

export const parseGitHubContributionSummary = Effect.fn(
  "www.github.parseContributionSummary"
)(function* (html: string) {
  const document = yield* parseGitHubContributionDocument(html);
  const heading = document.querySelector(CONTRIBUTION_HEADING_SELECTOR);

  if (!heading) {
    return yield* new GitHubContributionParseError({
      message: "GitHub contribution heading was not found.",
    });
  }

  const total = yield* parseGitHubContributionTotal(heading.structuredText);
  const dayElements = document.querySelectorAll(CONTRIBUTION_DAY_SELECTOR);

  if (dayElements.length === 0) {
    return yield* new GitHubContributionParseError({
      message: "GitHub contribution days were not found.",
    });
  }

  const candidates: unknown[] = [];

  for (const dayElement of dayElements) {
    const date = dayElement.getAttribute("data-date");
    const level = dayElement.getAttribute("data-level");

    if (!(date && level)) {
      return yield* new GitHubContributionParseError({
        message: "A GitHub contribution day was incomplete.",
      });
    }

    candidates.push({
      date,
      level: Number(level),
    });
  }

  const summary = yield* Schema.decodeUnknown(GitHubContributionSummarySchema)({
    days: candidates,
    total,
  }).pipe(
    Effect.mapError(
      () =>
        new GitHubContributionParseError({
          message: "GitHub contribution days were invalid.",
        })
    )
  );
  const sortedDays = EffectArray.sortWith(
    summary.days,
    (day) => day.date,
    Order.string
  );
  const uniqueDates = new Set(sortedDays.map((day) => day.date));

  if (uniqueDates.size !== sortedDays.length) {
    return yield* new GitHubContributionParseError({
      message: "GitHub contribution days contained duplicate dates.",
    });
  }

  return {
    days: sortedDays,
    total: summary.total,
  } satisfies GitHubContributionSummary;
});

export const getGitHubContributionSummary = Effect.fn(
  "www.github.getContributionSummary"
)(function* () {
  const source = yield* GitHubContributionSource;
  const html = yield* source.read;

  return yield* parseGitHubContributionSummary(html);
});

export async function loadGitHubContributionSummary() {
  return Option.getOrNull(
    await Effect.runPromise(
      getGitHubContributionSummary().pipe(
        Effect.provide(GitHubContributionSourceLive),
        Effect.option
      )
    )
  );
}
