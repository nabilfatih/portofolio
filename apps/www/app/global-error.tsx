"use client";

import "@repo/design-system/styles/globals.css";
import "@repo/design-system/styles/theme.css";

import { Button } from "@repo/design-system/components/ui/button";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-background font-sans text-foreground antialiased">
        <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
          <h1 className="font-bold text-4xl">Something went wrong</h1>
          <p>Please try loading the page again.</p>
          <Button onClick={reset}>Try again</Button>
        </main>
      </body>
    </html>
  );
}
