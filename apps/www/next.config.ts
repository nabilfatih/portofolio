import type { NextConfig } from "next";

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

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        headers: [...securityHeaders],
        source: "/(.*)",
      },
      {
        headers: [...contentHeaders],
        source: "/",
      },
      {
        headers: [...contentHeaders],
        source: "/work",
      },
      {
        headers: [...contentHeaders],
        source: "/privacy",
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
