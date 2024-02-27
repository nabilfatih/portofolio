"use client"

import * as React from "react"
import { IconBrush } from "@tabler/icons-react"
import { useTheme } from "next-themes"

import { themes } from "@/lib/data/themes"
import { capitalizeFirstLetter } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

type Props = {
  side?: "right" | "top" | "bottom" | "left"
  align?: "start" | "center" | "end"
}

export default function ThemeToggle({ side = "right", align = "end" }: Props) {
  const { setTheme } = useTheme()
  const [_, startTransition] = React.useTransition()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <IconBrush className="h-5 w-5 transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0" side={side} align={align}>
        <ScrollArea className="h-[500px]">
          <DropdownMenuLabel className="mx-1 mt-1">Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="px-1 pb-1">
            {themes.map(theme => (
              <DropdownMenuItem
                key={theme}
                onClick={() => {
                  startTransition(() => {
                    setTheme(theme)
                  })
                }}
              >
                {capitalizeFirstLetter(theme)}
              </DropdownMenuItem>
            ))}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
