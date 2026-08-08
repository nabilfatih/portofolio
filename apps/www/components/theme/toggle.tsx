"use client";

import { PaintBoardIcon } from "@hugeicons/core-free-icons";
import { Button } from "@repo/design-system/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/design-system/components/ui/dropdown-menu";
import { HugeIcons } from "@repo/design-system/components/ui/huge-icons";
import { themeOptions } from "@repo/design-system/lib/theme/options";
import { cn } from "@repo/design-system/lib/utils";
import { useTheme } from "next-themes";
import { useCallback } from "react";

interface ThemeToggleProps {
  align?: "center" | "end" | "start";
  side?: "bottom" | "left" | "right" | "top";
}

const BASE_THEME_COUNT = 3;

interface ThemeItemProps {
  currentTheme: string | undefined;
  onSelect: (value: string) => void;
  option: (typeof themeOptions)[number];
}

function ThemeItem({ currentTheme, onSelect, option }: ThemeItemProps) {
  const handleSelect = useCallback(() => {
    onSelect(option.value);
  }, [onSelect, option.value]);

  return (
    <DropdownMenuItem className="cursor-pointer" onClick={handleSelect}>
      <HugeIcons icon={option.icon} />
      <span className="capitalize">{option.value}</span>
      <span
        aria-hidden="true"
        className={cn(
          "ml-auto size-2 rounded-full bg-primary opacity-0 transition-opacity",
          currentTheme === option.value && "opacity-100"
        )}
      />
    </DropdownMenuItem>
  );
}

function ThemeItems({ start, end }: { start: number; end?: number }) {
  const { setTheme, theme: currentTheme } = useTheme();

  return themeOptions
    .slice(start, end)
    .map((theme) => (
      <ThemeItem
        currentTheme={currentTheme}
        key={theme.value}
        onSelect={setTheme}
        option={theme}
      />
    ));
}

export default function ThemeToggle({
  align = "end",
  side = "bottom",
}: ThemeToggleProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button aria-label="Choose theme" size="icon" variant="outline">
            <HugeIcons className="size-5" icon={PaintBoardIcon} />
          </Button>
        }
      />
      <DropdownMenuContent
        align={align}
        className="max-h-[min(var(--available-height),24rem)] w-max"
        side={side}
      >
        <DropdownMenuGroup>
          <ThemeItems end={BASE_THEME_COUNT} start={0} />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <ThemeItems start={BASE_THEME_COUNT} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
