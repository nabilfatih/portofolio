import { describe, expect, it } from "@effect/vitest";
import { Effect, Layer, Option } from "effect";
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
  it.effect(
    "loads the contribution calendar through the Effect service",
    () => {
      const source = Layer.succeed(GitHubContributionSource, {
        read: Effect.succeed(contributionHtml),
      });

      return getGitHubContributionSummary().pipe(
        Effect.provide(source),
        Effect.tap((summary) =>
          Effect.sync(() => {
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
          })
        )
      );
    }
  );

  it.effect("keeps an invalid GitHub response in the typed error channel", () =>
    parseGitHubContributionSummary("<h2>Contribution activity</h2>").pipe(
      Effect.flip,
      Effect.tap((error) =>
        Effect.sync(() => {
          expect(error).toBeInstanceOf(GitHubContributionParseError);
          expect(error._tag).toBe("GitHubContributionParseError");
        })
      )
    )
  );

  it.effect("returns null when GitHub data cannot be validated", () => {
    const source = Layer.succeed(GitHubContributionSource, {
      read: Effect.succeed("<h2>Contribution activity</h2>"),
    });

    return getGitHubContributionSummary().pipe(
      Effect.provide(source),
      Effect.option,
      Effect.map(Option.getOrNull),
      Effect.tap((summary) =>
        Effect.sync(() => {
          expect(summary).toBeNull();
        })
      )
    );
  });

  it.effect("keeps an invalid calendar in the typed error channel", () =>
    parseGitHubContributionSummary(`
        <h2 id="js-contribution-activity-description">
          5 contributions in the last year
        </h2>
      `).pipe(
      Effect.flip,
      Effect.tap((error) =>
        Effect.sync(() => {
          expect(error).toBeInstanceOf(GitHubContributionParseError);
          expect(error._tag).toBe("GitHubContributionParseError");
        })
      )
    )
  );

  it.effect("parses a contribution calendar independently", () =>
    parseGitHubContributionSummary(contributionHtml).pipe(
      Effect.tap((summary) =>
        Effect.sync(() => {
          expect(summary.days).toHaveLength(3);
          expect(summary.days[0]?.date).toBe("2025-08-10");
        })
      )
    )
  );
});
