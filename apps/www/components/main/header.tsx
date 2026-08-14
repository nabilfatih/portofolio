import { Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeIcons } from "@repo/design-system/components/ui/huge-icons";
import { buttonVariants } from "@repo/design-system/lib/button";
import Image from "next/image";
import Link from "next/link";
import MainSidebarMobile from "@/components/main/sidebar-mobile";
import { CONTACT_HREF } from "@/lib/site";
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
            className={buttonVariants({ size: "sm", variant: "ghost" })}
            href="/work"
          >
            Work
          </Link>
          <a className={buttonVariants({ size: "sm" })} href={CONTACT_HREF}>
            <HugeIcons data-icon="inline-start" icon={Mail01Icon} />
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
