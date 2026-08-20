import type { ReactNode } from "react";

export function CapabilityList({ children }: { readonly children: ReactNode }) {
  return <ul className="mt-8 flex flex-col gap-10">{children}</ul>;
}

export function Capability({
  children,
  title,
}: {
  readonly children: ReactNode;
  readonly title: string;
}) {
  return (
    <li className="grid gap-3 sm:grid-cols-[12rem_1fr] sm:gap-8">
      <h3 className="font-medium text-xl tracking-tight">{title}</h3>
      <div className="space-y-4 [&_p]:text-sm [&_ul]:text-sm">{children}</div>
    </li>
  );
}

export function ProcessList({ children }: { readonly children: ReactNode }) {
  return <ol className="mt-8 grid gap-3 sm:grid-cols-2">{children}</ol>;
}

export function ProcessStep({
  children,
  number,
  title,
}: {
  readonly children: ReactNode;
  readonly number: string;
  readonly title: string;
}) {
  return (
    <li className="flex flex-col gap-4 rounded-xl bg-muted/50 p-4">
      <span className="text-muted-foreground text-sm tabular-nums">
        {number}
      </span>
      <div className="flex flex-col gap-2">
        <h3 className="font-medium text-sm">{title}</h3>
        <div className="[&_p]:text-sm">{children}</div>
      </div>
    </li>
  );
}
