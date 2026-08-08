import type { ProxyConfig } from "next/server";
import { type NextRequest, NextResponse } from "next/server";
import { resolveMarkdownRoute } from "@/lib/agent-routing";

export function proxy(request: NextRequest) {
  const markdownRoute = resolveMarkdownRoute({
    acceptHeader: request.headers.get("accept"),
    pathname: request.nextUrl.pathname,
  });

  if (!markdownRoute) {
    const response = NextResponse.next();
    response.headers.set("Vary", "Accept");
    response.headers.set("X-Llms-Txt", "/llms.txt");

    return response;
  }

  const rewriteUrl = new URL(request.url);
  rewriteUrl.pathname = markdownRoute;

  const response = NextResponse.rewrite(rewriteUrl);
  response.headers.set("Vary", "Accept");
  response.headers.set("X-Llms-Txt", "/llms.txt");

  return response;
}

export const config: ProxyConfig = {
  matcher: ["/", "/privacy", "/work"],
};
