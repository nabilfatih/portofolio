import { readFileSync } from "node:fs";
import {
  concreteThemeValues,
  DEFAULT_THEME,
  getThemeAppearance,
  themes,
} from "@repo/design-system/lib/theme/registry";
import { describe, expect, it } from "vitest";

describe("theme registry", () => {
  it("keeps every selectable theme unique", () => {
    const values = themes.map((theme) => theme.value);

    expect(DEFAULT_THEME).toBe("system");
    expect(new Set(values).size).toBe(values.length);
    expect(concreteThemeValues).not.toContain("system");
  });

  it("keeps the registry synchronized with custom theme selectors", () => {
    const stylesheet = readFileSync(
      new URL("../../styles/theme.css", import.meta.url),
      "utf8"
    );
    const selectors = [...stylesheet.matchAll(/^\.([a-z0-9-]+) \{/gm)].map(
      (match) => match[1]
    );
    const customThemes = concreteThemeValues.filter(
      (theme) => theme !== "light" && theme !== "dark"
    );

    const sortByName = (left: string, right: string) =>
      left.localeCompare(right);

    expect(selectors.sort(sortByName)).toEqual(
      [...customThemes].sort(sortByName)
    );
  });

  it("uses dark rendering only for the official dark theme", () => {
    expect(getThemeAppearance("dark")).toBe("dark");

    for (const theme of themes) {
      if (theme.value === "dark") {
        continue;
      }

      expect(getThemeAppearance(theme.value)).toBe("light");
    }
  });
});
