import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import "@/styles/globals.css"
import "@/styles/config.css"
import "@/styles/themes.css"

import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { themes } from "@/lib/data/themes"
import { cn } from "@/lib/utils"

import MainFooter from "@/components/main/footer"
import MainHeader from "@/components/main/header"
import { Providers } from "@/components/providers"

export const metadata: Metadata = {
  metadataBase: new URL("https://nabilfatih.com"),
  title: {
    default: "Nabil Akbarazzima Fatih",
    template: "%s | Nabil Fatih"
  },
  description: "Developer, learner, and creator.",
  generator: "Nabil Fatih",
  applicationName: "Nabil Fatih",
  creator: "Nabil Akbarazzima Fatih",
  authors: [{ name: "Nabil Akbarazzima Fatih" }],
  publisher: "Nabil Akbarazzima Fatih",
  formatDetection: {
    telephone: true,
    email: true,
    address: true
  },
  openGraph: {
    title: "Nabil Fatih",
    description: "Developer, learner, and creator.",
    url: "https://nabilfatih.com",
    siteName: "Nabil Fatih",
    locale: "en",
    type: "website",
    images: [
      {
        url: "https://www.nabilfatih.com/logo.png",
        width: 1080,
        height: 1080,
        alt: "Nabil Fatih"
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: [
      { url: "/logo.png" },
      new URL("/logo.png", "https://www.nabilfatih.com")
    ],
    shortcut: ["/logo.png", "/logo.png"],
    apple: [
      { url: "/apple-touch-icon.png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      {
        rel: "apple-touch-icon",
        url: "/apple-touch-icon.png"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Nabil Fatih",
    description: "Developer, learner, and creator.",
    creator: "@nabilfatih_",
    site: "@nabilfatih_",
    images: [
      {
        url: "https://www.nabilfatih.com/logo.png",
        width: 1080,
        height: 1080,
        alt: "Nabil Fatih"
      }
    ]
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  interactiveWidget: "resizes-visual"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable
        )}
        suppressHydrationWarning
      >
        <Providers
          attribute="class"
          enableSystem
          themes={themes}
          disableTransitionOnChange
        >
          <div className="flex min-h-[100dvh] flex-col">
            <MainHeader />
            <main className="flex flex-1 flex-col overflow-hidden">
              {children}
            </main>
            <MainFooter />
          </div>
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  )
}
