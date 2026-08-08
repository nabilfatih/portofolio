const MARKDOWN_ROUTES = new Map([
  ["/", "/index.md"],
  ["/privacy", "/privacy.md"],
  ["/work", "/work.md"],
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
