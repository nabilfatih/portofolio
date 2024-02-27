import Link from "next/link"

import ThemeToggle from "../theme/toggle"
import MainFooterArt from "./footer-art"

export default function MainFooter() {
  return (
    <footer className="border-t bg-card backdrop-blur-xl">
      <div className="pt-24">
        <div className="mx-auto w-full max-w-7xl shrink-0 space-y-2 px-4 pb-12">
          <div className="relative space-y-6">
            <Link href="/home" className="flex w-fit items-center">
              <h1 className="ml-1.5 flex items-center text-2xl font-semibold tracking-tighter">
                Nabil Fatih
              </h1>
            </Link>
            <div className="grid grid-cols-2 sm:grid-cols-4">
              <div className="flex gap-2">
                <ThemeToggle />
              </div>
              <div className="flex flex-col"></div>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-7xl shrink-0 space-y-2 border-t px-4 pt-2">
          <div className="grid grid-cols-3">
            <div className="col-span-2 grid h-fit pt-2 sm:col-span-1">
              <p className="mb-1 font-medium tracking-tight">
                Nabil Fatih © {new Date().getFullYear()}
              </p>
            </div>
            <div className="sm:col-span-2">
              <div className="flex flex-wrap items-center"></div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 pt-12">
          <p className="text-balance tracking-tight">
            All right reserved. Made with{" "}
            <span className="text-accent">❤️</span>
          </p>
        </div>
      </div>

      <MainFooterArt />
    </footer>
  )
}
