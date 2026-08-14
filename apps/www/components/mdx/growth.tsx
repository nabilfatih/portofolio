import type { ComponentProps } from "react";
import { NakafaGrowthChart } from "@/components/work/growth-chart";
import { NakafaReferralChart } from "@/components/work/referral-chart";
import { nakafaGrowthEvidence } from "@/lib/nakafa-growth";

export type GrowthChartProps = ComponentProps<typeof NakafaGrowthChart>;
export type ReferralChartProps = ComponentProps<typeof NakafaReferralChart>;

export function GrowthResults() {
  const { searchConsole } = nakafaGrowthEvidence;

  return (
    <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
      <Metric
        label="organic clicks"
        value={searchConsole.clicks.toLocaleString("en")}
      />
      <Metric
        label="search impressions"
        value={searchConsole.impressions.toLocaleString("en")}
      />
      <Metric label="average CTR" value={`${searchConsole.ctrPercent}%`} />
      <Metric
        label="average position"
        value={searchConsole.averagePosition.toString()}
      />
    </dl>
  );
}

export function GrowthChart(props: GrowthChartProps) {
  return <NakafaGrowthChart {...props} />;
}

export function ReferralChart(props: ReferralChartProps) {
  return <NakafaReferralChart {...props} />;
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <dt className="order-2 mt-1 text-muted-foreground text-sm">{label}</dt>
      <dd className="order-1 font-medium text-2xl tracking-tight">{value}</dd>
    </div>
  );
}
