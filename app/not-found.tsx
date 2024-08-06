import { Link } from "next-view-transitions"

import { Button } from "@/components/ui/button"

export default async function NotFound() {
  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      <div className="relative flex h-[calc(100dvh-4rem)] overflow-hidden">
        <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center space-y-4 px-4 text-center">
          <h2 className="text-4xl font-bold">404: Not found</h2>
          <p>Resource not found.</p>
          <Button asChild>
            <Link href="/">Return home</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
