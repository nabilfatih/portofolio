import {
  Context,
  Effect,
  Array as EffectArray,
  Layer,
  Order,
  Schema,
} from "effect";

const CONTRIBUTIONS_URL = "https://github.com/users/nabilfatih/contributions";
const CONTRIBUTIONS_CACHE_SECONDS = 86_400;
const CONTRIBUTION_HEADING_PATTERN =
  /<h2[^>]*id="js-contribution-activity-description"[^>]*>([\s\S]*?)<\/h2>/i;
const CONTRIBUTION_COUNT_PATTERN =
  /^([\d,]+) contributions? in the last year$/i;
const CONTRIBUTION_DAY_PATTERN =
  /<td\b(?=[^>]*\bdata-date="(\d{4}-\d{2}-\d{2})")(?=[^>]*\bdata-level="([0-4])")[^>]*><\/td>/gi;

const FALLBACK_GITHUB_CONTRIBUTIONS = 3718;

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

export const parseGitHubContributionCount = Effect.fn(
  "www.github.parseContributionCount"
)(function* (html: string) {
  const heading = html.match(CONTRIBUTION_HEADING_PATTERN);

  if (!heading?.[1]) {
    return yield* new GitHubContributionParseError({
      message: "GitHub contribution heading was not found.",
    });
  }

  const headingText = heading[1]
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const count = headingText.match(CONTRIBUTION_COUNT_PATTERN);

  if (!count?.[1]) {
    return yield* new GitHubContributionParseError({
      message: "GitHub contribution count was not found.",
    });
  }

  const parsedCount = Number.parseInt(count[1].replaceAll(",", ""), 10);

  if (!Number.isSafeInteger(parsedCount) || parsedCount < 0) {
    return yield* new GitHubContributionParseError({
      message: "GitHub contribution count was invalid.",
    });
  }

  return parsedCount;
});

export const parseGitHubContributionSummary = Effect.fn(
  "www.github.parseContributionSummary"
)(function* (html: string) {
  const total = yield* parseGitHubContributionCount(html);
  const candidates: unknown[] = [];

  for (const match of html.matchAll(CONTRIBUTION_DAY_PATTERN)) {
    const [, date, level] = match;

    if (!(date && level)) {
      return yield* new GitHubContributionParseError({
        message: "A GitHub contribution day was incomplete.",
      });
    }

    candidates.push({
      date,
      level: Number.parseInt(level, 10),
    });
  }

  if (candidates.length === 0) {
    return yield* new GitHubContributionParseError({
      message: "GitHub contribution days were not found.",
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

export const getGitHubContributionCount = Effect.fn(
  "www.github.getContributionCount"
)(function* () {
  const source = yield* GitHubContributionSource;
  const html = yield* source.read;

  return yield* parseGitHubContributionCount(html);
});

export const getGitHubContributionCountOrFallback = Effect.fn(
  "www.github.getContributionCountOrFallback"
)(function* () {
  return yield* getGitHubContributionCount().pipe(
    Effect.orElseSucceed(() => FALLBACK_GITHUB_CONTRIBUTIONS)
  );
});

export const getGitHubContributionSummary = Effect.fn(
  "www.github.getContributionSummary"
)(function* () {
  const source = yield* GitHubContributionSource;
  const html = yield* source.read;

  return yield* parseGitHubContributionSummary(html);
});

export const getGitHubContributionSummaryOrFallback = Effect.fn(
  "www.github.getContributionSummaryOrFallback"
)(function* () {
  return yield* getGitHubContributionSummary().pipe(
    Effect.orElseSucceed(
      (): GitHubContributionSummary => ({
        days: [],
        total: FALLBACK_GITHUB_CONTRIBUTIONS,
      })
    )
  );
});
