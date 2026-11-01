import geistSansFont from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url";
import geistSansCss from "@fontsource-variable/geist/index.css?url";
import geistMonoCss from "@fontsource-variable/geist-mono/index.css?url";
import { ThemeBootstrap } from "@repo/design-system/providers/theme-bootstrap";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import ErrorPage from "@/components/main/error-page";
import MainFooter from "@/components/main/footer";
import MainHeader from "@/components/main/header";
import NotFound from "@/components/main/not-found";
import { Providers } from "@/components/providers";
import { siteConfig } from "@/lib/site";
import stylesCss from "@/styles/app.css?url";

export const Route = createRootRoute({
  component: Outlet,
  errorComponent: ({ reset }) => <ErrorPage reset={reset} />,
  head: () => ({
    links: [
      {
        as: "font",
        crossOrigin: "anonymous",
        href: geistSansFont,
        rel: "preload",
        type: "font/woff2",
      },
      { href: stylesCss, rel: "stylesheet" },
      { href: geistSansCss, rel: "stylesheet" },
      { href: geistMonoCss, rel: "stylesheet" },
      { href: "/favicon.ico", rel: "icon", sizes: "any" },
      { href: "/apple-icon.png", rel: "apple-touch-icon" },
      { href: "/manifest.webmanifest", rel: "manifest" },
    ],
    meta: [
      { charSet: "utf-8" },
      {
        content:
          "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, interactive-widget=resizes-visual",
        name: "viewport",
      },
      { content: siteConfig.shortName, name: "application-name" },
      { content: siteConfig.name, name: "author" },
      { content: siteConfig.name, name: "creator" },
      { content: siteConfig.name, name: "publisher" },
      {
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        name: "robots",
      },
    ],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { readonly children: ReactNode }) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <ThemeBootstrap />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Providers>
          <div className="flex min-h-dvh flex-col">
            <MainHeader />
            <main className="flex flex-1 flex-col overflow-hidden">
              {children}
            </main>
            <MainFooter />
          </div>
        </Providers>
        {/* 404.html answers every unknown URL, so it must not hydrate at any of them. */}
        {pathname === "/404" ? null : <Scripts />}
      </body>
    </html>
  );
}
