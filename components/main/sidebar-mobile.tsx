import Link from "next/link"
import { IconLayoutSidebar } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger
} from "@/components/ui/sheet"

import { Sidebar } from "./sidebar"

export default function MainSidebarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="-ml-2 flex h-9 w-9 p-0 sm:hidden">
          <IconLayoutSidebar className="h-6 w-6" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-muted">
        <Sidebar className="grid">
          <div className="relative py-2">
            <section className="grid gap-4 py-10">
              <Link
                href="/"
                className="inline-flex justify-between border-t pt-4 text-sm underline-offset-4 hover:underline"
              >
                Home
              </Link>

              <Link
                href="/work"
                className="inline-flex justify-between border-t pt-4 text-sm underline-offset-4 hover:underline"
              >
                Work
              </Link>
            </section>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </Sidebar>
      </SheetContent>
    </Sheet>
  )
}
