/** Concrete visual appearance used by runtime renderers and integrations. */
export type ThemeAppearance = "light" | "dark";

type ThemeAppearancePolicy = ThemeAppearance | "dynamic";

interface ThemeDefinition {
  readonly appearance: ThemeAppearancePolicy;
  readonly value: string;
}

/** Selectable Nakafa themes and the appearance policy owned by each theme. */
export const themes = [
  {
    appearance: "light",
    value: "light",
  },
  {
    appearance: "dark",
    value: "dark",
  },
  {
    appearance: "dynamic",
    value: "system",
  },
  {
    appearance: "light",
    value: "darkmatter",
  },
  {
    appearance: "light",
    value: "bean",
  },
  {
    appearance: "light",
    value: "bubblegum",
  },
  {
    appearance: "light",
    value: "caffeine",
  },
  {
    appearance: "light",
    value: "claude",
  },
  {
    appearance: "light",
    value: "cosmic",
  },
  {
    appearance: "light",
    value: "cute",
  },
  {
    appearance: "light",
    value: "dreamy",
  },
  {
    appearance: "light",
    value: "ghibli",
  },
  {
    appearance: "light",
    value: "luxury",
  },
  {
    appearance: "light",
    value: "matcha",
  },
  {
    appearance: "light",
    value: "nature",
  },
  {
    appearance: "light",
    value: "neo",
  },
  {
    appearance: "light",
    value: "notebook",
  },
  {
    appearance: "light",
    value: "pacman",
  },
  {
    appearance: "light",
    value: "perpetuity",
  },
  {
    appearance: "light",
    value: "pinky",
  },
  {
    appearance: "light",
    value: "popsicle",
  },
  {
    appearance: "light",
    value: "retro",
  },
  {
    appearance: "light",
    value: "shell",
  },
  {
    appearance: "light",
    value: "solar",
  },
  {
    appearance: "light",
    value: "sunset",
  },
  {
    appearance: "light",
    value: "tangerine",
  },
  {
    appearance: "light",
    value: "tokyo",
  },
  {
    appearance: "light",
    value: "tree",
  },
  {
    appearance: "light",
    value: "twitter",
  },
  {
    appearance: "light",
    value: "vintage",
  },
  {
    appearance: "light",
    value: "windy",
  },
  {
    appearance: "light",
    value: "zelda",
  },
] as const satisfies readonly ThemeDefinition[];

/** Theme identifier accepted by the shared runtime and document bootstrap. */
export type ThemeValue = (typeof themes)[number]["value"];

/** Local-storage key shared by the document bootstrap and next-themes. */
export const THEME_STORAGE_KEY = "theme";

/** First-visit theme shared by the localized document and next-themes. */
export const DEFAULT_THEME = "system" satisfies ThemeValue;

/** Concrete class names managed on the document root. */
export const concreteThemeValues = themes.flatMap((theme) =>
  theme.appearance === "dynamic" ? [] : [theme.value]
);

/**
 * Resolves a next-themes runtime value to the concrete appearance consumers
 * should render. Unknown and pre-hydration values use Nakafa's light default.
 */
export function getThemeAppearance(
  resolvedTheme: string | undefined
): ThemeAppearance {
  const definition = themes.find((theme) => theme.value === resolvedTheme);

  if (definition?.appearance === "dark") {
    return "dark";
  }

  return "light";
}
