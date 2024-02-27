import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import "@/styles/globals.css"
import "@/styles/config.css"
import "@/styles/themes.css"

import { Suspense } from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/react"

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
  description: "Developer, writer, and creator.",
  openGraph: {
    title: "Nabil Fatih",
    description: "Developer, writer, and creator.",
    url: "https://nabilfatih.com",
    siteName: "Nabil Fatih",
    locale: "en_US",
    type: "website"
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
  twitter: {
    title: "Nabil Fatih",
    card: "summary_large_image"
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
              <Suspense>{children}</Suspense>
            </main>
            <MainFooter />
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
