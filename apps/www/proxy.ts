import type { ProxyConfig } from "next/server";
import { type NextRequest, NextResponse } from "next/server";
import { resolveMarkdownRoute } from "@/lib/agent-routing";
import { isUnknownCaseStudyPath } from "@/lib/case-slugs";

function addAgentHeaders(response: NextResponse) {
  response.headers.set("Vary", "Accept");
  response.headers.set("X-Llms-Txt", "/llms.txt");

  return response;
}

export function proxy(request: NextRequest) {
  if (isUnknownCaseStudyPath(request.nextUrl.pathname)) {
    return addAgentHeaders(new NextResponse(null, { status: 404 }));
  }

  const markdownRoute = resolveMarkdownRoute({
    acceptHeader: request.headers.get("accept"),
    pathname: request.nextUrl.pathname,
  });

  if (!markdownRoute) {
    return addAgentHeaders(NextResponse.next());
  }

  const rewriteUrl = new URL(request.url);
  rewriteUrl.pathname = markdownRoute;

  return addAgentHeaders(NextResponse.rewrite(rewriteUrl));
}

export const config: ProxyConfig = {
  matcher: ["/", "/collaborate", "/privacy", "/work/:path*"],
};
