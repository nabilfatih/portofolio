import { Effect, Layer } from "effect";
import { describe, expect, it } from "vitest";
import {
  GitHubContributionParseError,
  GitHubContributionSource,
  getGitHubContributionCount,
  getGitHubContributionCountOrFallback,
  getGitHubContributionSummary,
  getGitHubContributionSummaryOrFallback,
  parseGitHubContributionCount,
  parseGitHubContributionSummary,
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
  <table>
    <tbody>
      <tr>
        <td data-date="2025-08-11" data-level="2"></td>
        <tool-tip>4 contributions on August 11th.</tool-tip>
        <td data-date="2025-08-10" data-level="1"></td>
        <tool-tip>1 contribution on August 10th.</tool-tip>
        <td data-date="2025-08-12" data-level="0"></td>
        <tool-tip>No contributions on August 12th.</tool-tip>
      </tr>
    </tbody>
  </table>
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

  it("loads the contribution calendar through the Effect service", async () => {
    const source = Layer.succeed(GitHubContributionSource, {
      read: Effect.succeed(contributionHtml),
    });

    const summary = await Effect.runPromise(
      getGitHubContributionSummary().pipe(Effect.provide(source))
    );

    expect(summary).toEqual({
      days: [
        {
          date: "2025-08-10",
          level: 1,
        },
        {
          date: "2025-08-11",
          level: 2,
        },
        {
          date: "2025-08-12",
          level: 0,
        },
      ],
      total: 3718,
    });
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

  it("keeps an invalid calendar in the typed error channel", async () => {
    const error = await Effect.runPromise(
      parseGitHubContributionSummary(`
        <h2 id="js-contribution-activity-description">
          3,718 contributions in the last year
        </h2>
      `).pipe(Effect.flip)
    );

    expect(error).toBeInstanceOf(GitHubContributionParseError);
    expect(error._tag).toBe("GitHubContributionParseError");
  });

  it("keeps the verified total without inventing fallback calendar days", async () => {
    const source = Layer.succeed(GitHubContributionSource, {
      read: Effect.succeed("<h2>Contribution activity</h2>"),
    });

    const summary = await Effect.runPromise(
      getGitHubContributionSummaryOrFallback().pipe(Effect.provide(source))
    );

    expect(summary).toEqual({
      days: [],
      total: 3718,
    });
  });

  it("parses a contribution calendar independently", async () => {
    const summary = await Effect.runPromise(
      parseGitHubContributionSummary(contributionHtml)
    );

    expect(summary.days).toHaveLength(3);
    expect(summary.days[0]?.date).toBe("2025-08-10");
  });
});
