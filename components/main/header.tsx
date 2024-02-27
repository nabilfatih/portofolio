import Image from "next/image"
import Link from "next/link"

import ThemeToggle from "../theme/toggle"
import { IconSeparator } from "../ui/icons"

export default function MainHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 border-b bg-background backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl shrink-0 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="hidden sm:block">
            <Image
              src="/logo.webp"
              alt="Nabil Fatih"
              width={24}
              height={24}
              priority
              sizes="24px"
              className="mr-2 rounded-full object-cover shadow"
            />
          </Link>
          <h1 className="flex items-center">
            <IconSeparator className="h-6 w-6 text-muted-foreground/50" />

            <Link
              href="/"
              className="ml-2 text-lg font-semibold tracking-tighter"
            >
              Nabil Fatih
            </Link>
          </h1>
        </div>
        <div className="flex items-center justify-end space-x-2 sm:space-x-4">
          <ThemeToggle side="bottom" align="end" />
        </div>
      </div>
    </header>
  )
}
