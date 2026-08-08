import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeIcons } from "@repo/design-system/components/ui/huge-icons";
import { buttonVariants } from "@repo/design-system/lib/button";
import Image from "next/image";
import Link from "next/link";
import MainSidebarMobile from "@/components/main/sidebar-mobile";
import ThemeToggle from "@/components/theme/toggle";
import logo from "@/public/logo.webp";

export default function MainHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 border-b bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-2xl shrink-0 items-center justify-between px-4">
        <div className="flex items-center">
          <MainSidebarMobile />
          <Link
            aria-label="Nabil Fatih home"
            className="hidden sm:block"
            href="/"
          >
            <Image
              alt="Nabil Fatih"
              className="mr-2 rounded-full border object-cover shadow"
              height={24}
              preload
              sizes="24px"
              src={logo}
              width={24}
            />
          </Link>
          <span aria-hidden="true" className="text-muted-foreground/50">
            /
          </span>
          <Link
            className="ml-2 font-semibold text-lg tracking-tighter"
            href="/"
          >
            Nabil Fatih
          </Link>
        </div>
        <nav
          aria-label="Primary"
          className="flex items-center justify-end gap-2"
        >
          <Link
            className="hidden pr-2 text-sm underline-offset-4 hover:underline sm:inline-flex"
            href="/work"
          >
            Work
          </Link>
          <ThemeToggle />
          <a
            aria-label="Portfolio source on GitHub"
            className={buttonVariants({ size: "icon", variant: "outline" })}
            href="https://github.com/nabilfatih/portofolio"
            rel="noopener noreferrer"
            target="_blank"
          >
            <HugeIcons className="size-5" icon={GithubIcon} />
          </a>
        </nav>
      </div>
    </header>
  );
}
