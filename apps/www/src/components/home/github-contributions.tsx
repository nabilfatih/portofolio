import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeIcons } from "@repo/design-system/components/ui/huge-icons";
import { DateTime } from "effect";
import type {
  GitHubContributionDay,
  GitHubContributionLevel,
  GitHubContributionSummary,
} from "@/lib/github";

const WEEK_IN_MILLISECONDS = 604_800_000;
const DAYS_IN_WEEK = 7;
const MINIMUM_MONTH_LABEL_COLUMNS = 3;
const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});
const GITHUB_PROFILE_URL = "https://github.com/nabilfatih";

const contributionLevelClassName = {
  0: "bg-muted",
  1: "bg-chart-1/25",
  2: "bg-chart-1/50",
  3: "bg-chart-1/75",
  4: "bg-chart-1",
} satisfies Record<GitHubContributionLevel, string>;

interface CalendarWeek {
  readonly days: readonly CalendarDay[];
  readonly key: string;
}

interface CalendarDay {
  readonly contribution: GitHubContributionDay | undefined;
  readonly date: string;
}

interface MonthLabel {
  readonly column: number;
  readonly label: string;
}

function dateFromIsoDate(isoDate: string) {
  return DateTime.makeUnsafe(`${isoDate}T00:00:00.000Z`);
}

function startOfWeek(date: DateTime.Utc) {
  return DateTime.subtract(date, {
    days: DateTime.getPartUtc(date, "weekDay"),
  });
}

function addDays(date: DateTime.Utc, days: number) {
  return DateTime.add(date, { days });
}

function buildCalendarWeeks(days: readonly GitHubContributionDay[]) {
  const firstDay = days.at(0);
  const lastDay = days.at(-1);

  if (!(firstDay && lastDay)) {
    return [];
  }

  const daysByDate = new Map(days.map((day) => [day.date, day]));
  const firstWeek = startOfWeek(dateFromIsoDate(firstDay.date));
  const lastWeek = startOfWeek(dateFromIsoDate(lastDay.date));
  const weekCount =
    Math.round(
      (DateTime.toEpochMillis(lastWeek) - DateTime.toEpochMillis(firstWeek)) /
        WEEK_IN_MILLISECONDS
    ) + 1;

  return Array.from(
    { length: weekCount },
    (_weekSlot, weekIndex): CalendarWeek => {
      const weekStart = addDays(firstWeek, weekIndex * DAYS_IN_WEEK);

      return {
        days: Array.from({ length: DAYS_IN_WEEK }, (_daySlot, dayIndex) => {
          const date = DateTime.formatIsoDateUtc(addDays(weekStart, dayIndex));

          return {
            contribution: daysByDate.get(date),
            date,
          };
        }),
        key: DateTime.formatIsoDateUtc(weekStart),
      };
    }
  );
}

function firstContribution(week: CalendarWeek) {
  for (const day of week.days) {
    if (day.contribution) {
      return day.contribution;
    }
  }
}

function firstDayOfMonth(week: CalendarWeek) {
  for (const day of week.days) {
    if (
      day.contribution &&
      DateTime.getPartUtc(dateFromIsoDate(day.date), "day") === 1
    ) {
      return day.contribution;
    }
  }
}

function buildMonthLabels(weeks: readonly CalendarWeek[]) {
  const labels: MonthLabel[] = [];

  for (const [weekIndex, week] of weeks.entries()) {
    const contribution =
      weekIndex === 0 ? firstContribution(week) : firstDayOfMonth(week);

    if (!contribution) {
      continue;
    }

    labels.push({
      column: weekIndex + 1,
      label: MONTH_FORMATTER.format(
        DateTime.toDateUtc(dateFromIsoDate(contribution.date))
      ),
    });
  }

  const firstLabel = labels.at(0);
  const secondLabel = labels.at(1);

  if (
    firstLabel &&
    secondLabel &&
    secondLabel.column - firstLabel.column < MINIMUM_MONTH_LABEL_COLUMNS
  ) {
    return labels.slice(1);
  }

  return labels;
}

export function GitHubContributions({
  summary,
}: {
  readonly summary: GitHubContributionSummary;
}) {
  const weeks = buildCalendarWeeks(summary.days);
  const monthLabels = buildMonthLabels(weeks);

  return (
    <div className="mt-8">
      <a
        className="inline-flex items-center gap-2 rounded-sm text-base text-muted-foreground underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        href={GITHUB_PROFILE_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        <HugeIcons className="size-4 text-primary" icon={GithubIcon} />
        <span>
          <span className="font-medium text-foreground tabular-nums">
            {summary.total.toLocaleString("en-US")}
          </span>{" "}
          contributions in the last year
        </span>
      </a>

      {weeks.length > 0 ? (
        <figure className="mt-4">
          <figcaption className="sr-only">
            Daily GitHub contribution activity for the last year.
          </figcaption>
          <div className="overflow-x-auto pb-2">
            <a
              aria-label="View GitHub contribution activity"
              className="block w-max rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              href={GITHUB_PROFILE_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div role="presentation">
                <div
                  aria-hidden="true"
                  className="mb-1 grid h-5 gap-0.5 text-muted-foreground text-sm"
                  style={{
                    gridTemplateColumns: `repeat(${weeks.length}, 0.625rem)`,
                  }}
                >
                  {monthLabels.map((month) => (
                    <span
                      className="whitespace-nowrap before:content-[attr(data-label)]"
                      data-label={month.label}
                      key={`${month.column}-${month.label}`}
                      style={{ gridColumnStart: month.column }}
                    />
                  ))}
                </div>
                <div aria-hidden="true" className="flex gap-0.5">
                  {weeks.map((week) => (
                    <div className="grid grid-rows-7 gap-0.5" key={week.key}>
                      {week.days.map((day) =>
                        day.contribution ? (
                          <span
                            className={`size-2.5 rounded-[2px] ${contributionLevelClassName[day.contribution.level]}`}
                            key={day.date}
                          />
                        ) : (
                          <span className="size-2.5" key={day.date} />
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </a>
          </div>
        </figure>
      ) : null}
    </div>
  );
}
