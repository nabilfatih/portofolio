import { Effect, Layer } from "effect";
import { describe, expect, it } from "vitest";
import {
  GitHubContributionParseError,
  GitHubContributionSource,
  getGitHubContributionCount,
  getGitHubContributionCountOrFallback,
  parseGitHubContributionCount,
} from "@/lib/github";

const contributionHtml = `
  <h2
    id="js-contribution-activity-description"
    class="f4 text-normal mb-2"
  >
    3,718
    contributions
    in the last year
  </h2>
`;

describe("GitHub contribution count", () => {
  it("loads the contribution total through the Effect service", async () => {
    const source = Layer.succeed(GitHubContributionSource, {
      read: Effect.succeed(contributionHtml),
    });

    const count = await Effect.runPromise(
      getGitHubContributionCount().pipe(Effect.provide(source))
    );

    expect(count).toBe(3718);
  });

  it("keeps an invalid GitHub response in the typed error channel", async () => {
    const error = await Effect.runPromise(
      parseGitHubContributionCount("<h2>Contribution activity</h2>").pipe(
        Effect.flip
      )
    );

    expect(error).toBeInstanceOf(GitHubContributionParseError);
    expect(error._tag).toBe("GitHubContributionParseError");
  });

  it("uses the last verified public total when GitHub is unavailable", async () => {
    const source = Layer.succeed(GitHubContributionSource, {
      read: Effect.succeed("<h2>Contribution activity</h2>"),
    });

    const count = await Effect.runPromise(
      getGitHubContributionCountOrFallback().pipe(Effect.provide(source))
    );

    expect(count).toBe(3718);
  });
});
