import {
  NAKAFA_GROWTH_CASE_STUDY_HREF,
  NAKAFA_GROWTH_MARKDOWN_HREF,
} from "@/lib/nakafa-growth";

const MARKDOWN_ROUTES = new Map([
  ["/", "/index.md"],
  ["/collaborate", "/collaborate.md"],
  ["/privacy", "/privacy.md"],
  ["/work", "/work.md"],
  [NAKAFA_GROWTH_CASE_STUDY_HREF, NAKAFA_GROWTH_MARKDOWN_HREF],
]);

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

  return MARKDOWN_ROUTES.get(pathname) ?? null;
}
