import { Effect, Layer, Option } from "effect";
import { describe, expect, it } from "vitest";
import {
  GitHubContributionParseError,
  GitHubContributionSource,
  getGitHubContributionSummary,
  parseGitHubContributionSummary,
} from "@/lib/github";

const contributionHtml = `
  <h2
    id="js-contribution-activity-description"
    class="f4 text-normal mb-2"
  >
    5
    contributions
    in the last year
  </h2>
  <table>
    <tbody>
      <tr>
        <td class="ContributionCalendar-day" data-level="2" data-date="2025-08-11"></td>
        <tool-tip>4 contributions on August 11th.</tool-tip>
        <td class="ContributionCalendar-day" data-date="2025-08-10" data-level="1"></td>
        <tool-tip>1 contribution on August 10th.</tool-tip>
        <td class="ContributionCalendar-day" data-date="2025-08-12" data-level="0"></td>
        <tool-tip>No contributions on August 12th.</tool-tip>
      </tr>
    </tbody>
  </table>
`;

describe("GitHub contribution summary", () => {
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
      total: 5,
    });
  });

  it("keeps an invalid GitHub response in the typed error channel", async () => {
    const error = await Effect.runPromise(
      parseGitHubContributionSummary("<h2>Contribution activity</h2>").pipe(
        Effect.flip
      )
    );

    expect(error).toBeInstanceOf(GitHubContributionParseError);
    expect(error._tag).toBe("GitHubContributionParseError");
  });

  it("returns null when GitHub data cannot be validated", async () => {
    const source = Layer.succeed(GitHubContributionSource, {
      read: Effect.succeed("<h2>Contribution activity</h2>"),
    });

    const summary = Option.getOrNull(
      await Effect.runPromise(
        getGitHubContributionSummary().pipe(
          Effect.provide(source),
          Effect.option
        )
      )
    );

    expect(summary).toBeNull();
  });

  it("keeps an invalid calendar in the typed error channel", async () => {
    const error = await Effect.runPromise(
      parseGitHubContributionSummary(`
        <h2 id="js-contribution-activity-description">
          5 contributions in the last year
        </h2>
      `).pipe(Effect.flip)
    );

    expect(error).toBeInstanceOf(GitHubContributionParseError);
    expect(error._tag).toBe("GitHubContributionParseError");
  });

  it("parses a contribution calendar independently", async () => {
    const summary = await Effect.runPromise(
      parseGitHubContributionSummary(contributionHtml)
    );

    expect(summary.days).toHaveLength(3);
    expect(summary.days[0]?.date).toBe("2025-08-10");
  });
});
