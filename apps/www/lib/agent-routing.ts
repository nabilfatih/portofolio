import { isCaseSlug } from "@/lib/case-slugs";

const MARKDOWN_ROUTES = new Map([
  ["/", "/index.md"],
  ["/collaborate", "/collaborate.md"],
  ["/privacy", "/privacy.md"],
  ["/work", "/work.md"],
]);

function resolveCaseStudyMarkdownRoute(pathname: string) {
  if (!pathname.startsWith("/work/")) {
    return null;
  }

  const slug = pathname.slice("/work/".length);

  if (!isCaseSlug(slug)) {
    return null;
  }

  return `/work/${slug}.md`;
}

export function resolveMarkdownRoute({
  acceptHeader,
  pathname,
}: {
  acceptHeader: string | null;
  pathname: string;
}) {
  if (!acceptHeader?.includes("text/markdown")) {
    return null;
  }

  return (
    MARKDOWN_ROUTES.get(pathname) ?? resolveCaseStudyMarkdownRoute(pathname)
  );
}
