import "@repo/design-system/styles/globals.css";
import "@repo/design-system/styles/theme.css";

import { ThemeBootstrap } from "@repo/design-system/providers/theme-bootstrap";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import MainFooter from "@/components/main/footer";
import MainHeader from "@/components/main/header";
import { Providers } from "@/components/providers";
import { SITE_URL, SOCIAL_IMAGE, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": "/index.md",
    },
  },
  applicationName: siteConfig.shortName,
  authors: [{ name: siteConfig.name, url: SITE_URL }],
  creator: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    description: siteConfig.description,
    images: [SOCIAL_IMAGE],
    locale: "en_US",
    siteName: siteConfig.shortName,
    title: siteConfig.title,
    type: "website",
    url: SITE_URL,
  },
  publisher: siteConfig.name,
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.shortName}`,
  },
  twitter: {
    card: "summary",
    creator: "@nabilfatih_",
    description: siteConfig.description,
    images: [SOCIAL_IMAGE.url],
    title: siteConfig.title,
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  interactiveWidget: "resizes-visual",
  maximumScale: 5,
  userScalable: true,
  width: "device-width",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <ThemeBootstrap />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <p className="sr-only">
          For AI agents: use <Link href="/llms.txt">/llms.txt</Link> to read
          this portfolio in plain text.
        </p>
        <Providers>
          <div className="flex min-h-dvh flex-col">
            <MainHeader />
            <main className="flex flex-1 flex-col overflow-hidden">
              {children}
            </main>
            <MainFooter />
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
