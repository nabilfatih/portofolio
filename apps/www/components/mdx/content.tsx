import { ArrowRight02Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeIcons } from "@repo/design-system/components/ui/huge-icons";
import { buttonVariants } from "@repo/design-system/lib/button";
import { cn } from "@repo/design-system/lib/utils";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { CONTACT_HREF } from "@/lib/site";

export function MdxHeading2({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "text-balance font-medium text-2xl tracking-tighter",
        className
      )}
      {...props}
    />
  );
}

export function MdxHeading3({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn("font-medium text-lg tracking-tight", className)}
      {...props}
    />
  );
}

export function MdxParagraph({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-pretty text-foreground/80 leading-relaxed",
        className
      )}
      {...props}
    />
  );
}

export function MdxUnorderedList({
  className,
  ...props
}: ComponentProps<"ul">) {
  return (
    <ul
      className={cn("list-disc space-y-2 pl-5 text-foreground/80", className)}
      {...props}
    />
  );
}

export function MdxOrderedList({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol
      className={cn(
        "list-decimal space-y-2 pl-5 text-foreground/80",
        className
      )}
      {...props}
    />
  );
}

export function MdxListItem({ className, ...props }: ComponentProps<"li">) {
  return <li className={cn("pl-1", className)} {...props} />;
}

export function MdxAnchor({
  children,
  className,
  href,
  rel,
  target,
  ...props
}: ComponentProps<"a">) {
  const resolvedClassName = cn(
    "text-primary underline underline-offset-4",
    className
  );

  if (!href) {
    return <span className={resolvedClassName}>{children}</span>;
  }

  if (href.startsWith("/")) {
    return (
      <Link className={resolvedClassName} href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a
      className={resolvedClassName}
      href={href}
      rel={rel ?? "noopener noreferrer"}
      target={target ?? "_blank"}
      {...props}
    >
      {children}
    </a>
  );
}

export function HomeTitle({ children }: { readonly children: ReactNode }) {
  return (
    <h1 className="mb-8 font-medium text-2xl tracking-tighter">{children}</h1>
  );
}

export function PageTitle({ children }: { readonly children: ReactNode }) {
  return (
    <h1 className="text-balance font-medium text-3xl tracking-tighter">
      {children}
    </h1>
  );
}

export function Eyebrow({ children }: { readonly children: ReactNode }) {
  return <p className="font-medium text-primary text-sm">{children}</p>;
}

export function Intro({ children }: { readonly children: ReactNode }) {
  return (
    <div className="[&_p]:max-w-none [&_p]:break-words [&_p]:text-foreground/80">
      {children}
    </div>
  );
}

export function PageHeader({ children }: { readonly children: ReactNode }) {
  return <header className="flex flex-col gap-4">{children}</header>;
}

export function Section({ children }: { readonly children: ReactNode }) {
  return <section className="mt-20 space-y-4">{children}</section>;
}

export function ChartSection({ children }: { readonly children: ReactNode }) {
  return <section className="mt-20 space-y-8">{children}</section>;
}

export function HomeSection({ children }: { readonly children: ReactNode }) {
  return <section className="mt-16 space-y-3 py-12">{children}</section>;
}

export function ProofPanel({ children }: { readonly children: ReactNode }) {
  return (
    <section className="mt-20 space-y-4 rounded-2xl bg-muted/40 p-5 sm:p-8">
      {children}
    </section>
  );
}

export function ActionRow({ children }: { readonly children: ReactNode }) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      {children}
    </div>
  );
}

export function ContactRow({ children }: { readonly children: ReactNode }) {
  return <div className="mt-6 flex">{children}</div>;
}

export function HeaderAction({ children }: { readonly children: ReactNode }) {
  return <div className="mt-2 flex">{children}</div>;
}

export function ProofAction({ children }: { readonly children: ReactNode }) {
  return <div className="mt-10 flex">{children}</div>;
}

export function PrimaryAction({
  children,
  href,
}: {
  readonly children: ReactNode;
  readonly href: string;
}) {
  return (
    <Link
      className={buttonVariants({ className: "w-full sm:w-fit" })}
      href={href}
    >
      {children}
      <HugeIcons data-icon="inline-end" icon={ArrowRight02Icon} />
    </Link>
  );
}

export function GhostAction({
  children,
  href,
}: {
  readonly children: ReactNode;
  readonly href: string;
}) {
  return (
    <Link
      className={buttonVariants({
        className: "w-full sm:w-fit",
        variant: "ghost",
      })}
      href={href}
    >
      {children}
    </Link>
  );
}

export function ContactAction({ children }: { readonly children: ReactNode }) {
  return (
    <a
      className={buttonVariants({ className: "w-full sm:w-fit" })}
      href={CONTACT_HREF}
    >
      <HugeIcons data-icon="inline-start" icon={Mail01Icon} />
      {children}
    </a>
  );
}

export function BackLink({
  children,
  href,
}: {
  readonly children: ReactNode;
  readonly href: string;
}) {
  return (
    <Link
      className="inline-flex text-muted-foreground text-sm underline-offset-4 hover:text-foreground hover:underline"
      href={href}
    >
      {children}
    </Link>
  );
}

export function AgentDirective() {
  return null;
}
