import createMdx from "@next/mdx";
import type { NextConfig } from "next";
import { nextMdxOptions } from "./mdx.config.ts";

const scriptSources = ["'self'", "'unsafe-inline'"];

if (process.env.NODE_ENV === "development") {
  scriptSources.push("'unsafe-eval'");
}

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src ${scriptSources.join(" ")}`,
      "script-src-attr 'none'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' blob: data:",
      "font-src 'self'",
      "connect-src 'self' https://vitals.vercel-insights.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), geolocation=(), microphone=()",
  },
] as const;

const contentHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=0, must-revalidate",
  },
  {
    key: "Link",
    value: '</llms.txt>; rel="alternate"; type="text/markdown"',
  },
  { key: "Vary", value: "Accept" },
  { key: "X-Llms-Txt", value: "/llms.txt" },
] as const;

const contentRoutes = [
  "/",
  "/case-studies",
  "/collaborate",
  "/privacy",
  "/work",
  "/work/:path*",
  "/case-studies.md",
  "/collaborate.md",
  "/index.md",
  "/llms-full.txt",
  "/llms.txt",
  "/privacy.md",
  "/work.md",
] as const;

const nextConfig: NextConfig = {
  cacheComponents: true,
  async headers() {
    return [
      {
        headers: [...securityHeaders],
        source: "/(.*)",
      },
      ...contentRoutes.map((source) => ({
        headers: [...contentHeaders],
        source,
      })),
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  pageExtensions: ["mdx", "tsx", "ts", "jsx", "js"],
  partialPrefetching: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default createMdx({
  options: nextMdxOptions,
})(nextConfig);
