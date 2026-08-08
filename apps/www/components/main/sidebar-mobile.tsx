"use client";

import { SidebarLeft01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@repo/design-system/components/ui/button";
import { HugeIcons } from "@repo/design-system/components/ui/huge-icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/design-system/components/ui/sheet";
import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
] as const;

export default function MainSidebarMobile() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            aria-label="Open navigation"
            className="-ml-2 sm:hidden"
            size="icon"
            variant="ghost"
          >
            <HugeIcons className="size-6" icon={SidebarLeft01Icon} />
          </Button>
        }
      />
      <SheetContent className="bg-muted" side="left">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            Navigate through Nabil Fatih's portfolio.
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="grid gap-4 px-4 py-10">
          {navigation.map((item, index) => (
            <SheetClose
              key={item.href}
              render={
                <Link
                  className={
                    index === 0
                      ? "inline-flex border-t pt-4 text-sm underline-offset-4 hover:underline"
                      : "inline-flex border-y py-4 text-sm underline-offset-4 hover:underline"
                  }
                  href={item.href}
                >
                  {item.label}
                </Link>
              }
            />
          ))}
        </nav>
        <SheetFooter>
          <SheetClose render={<Button variant="outline">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
