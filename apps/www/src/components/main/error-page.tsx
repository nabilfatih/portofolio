import { Button } from "@repo/design-system/components/ui/button";

export default function ErrorPage({ reset }: { readonly reset: () => void }) {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="font-bold text-4xl">Something went wrong</h1>
      <p>Please try loading the page again.</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
