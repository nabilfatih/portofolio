import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeIcons } from "@repo/design-system/components/ui/huge-icons";
import type {
  GitHubContributionDay,
  GitHubContributionLevel,
  GitHubContributionSummary,
} from "@/lib/github";

const DAY_IN_MILLISECONDS = 86_400_000;
const DAYS_IN_WEEK = 7;
const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});

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
  const [year, month, day] = isoDate.split("-").map(Number);

  return new Date(Date.UTC(year ?? 0, (month ?? 1) - 1, day ?? 1));
}

function isoDateFromDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function startOfWeek(date: Date) {
  return new Date(date.getTime() - date.getUTCDay() * DAY_IN_MILLISECONDS);
}

function addDays(date: Date, days: number) {
  return new Date(date.getTime() + days * DAY_IN_MILLISECONDS);
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
      (lastWeek.getTime() - firstWeek.getTime()) /
        (DAY_IN_MILLISECONDS * DAYS_IN_WEEK)
    ) + 1;

  return Array.from(
    { length: weekCount },
    (_weekSlot, weekIndex): CalendarWeek => {
      const weekStart = addDays(firstWeek, weekIndex * DAYS_IN_WEEK);

      return {
        days: Array.from({ length: DAYS_IN_WEEK }, (_daySlot, dayIndex) => {
          const date = isoDateFromDate(addDays(weekStart, dayIndex));

          return {
            contribution: daysByDate.get(date),
            date,
          };
        }),
        key: isoDateFromDate(weekStart),
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
    if (day.contribution && dateFromIsoDate(day.date).getUTCDate() === 1) {
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
      label: MONTH_FORMATTER.format(dateFromIsoDate(contribution.date)),
    });
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
        className="inline-flex items-center gap-2 rounded-sm text-muted-foreground text-sm underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        href="https://github.com/nabilfatih"
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
            <div className="w-max" role="presentation">
              <div
                aria-hidden="true"
                className="mb-1 grid h-4 gap-0.5 text-[10px] text-muted-foreground"
                style={{
                  gridTemplateColumns: `repeat(${weeks.length}, 0.625rem)`,
                }}
              >
                {monthLabels.map((month) => (
                  <span
                    className="whitespace-nowrap"
                    key={`${month.column}-${month.label}`}
                    style={{ gridColumnStart: month.column }}
                  >
                    {month.label}
                  </span>
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
          </div>
        </figure>
      ) : null}
    </div>
  );
}
