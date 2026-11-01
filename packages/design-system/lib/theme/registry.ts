import { Option } from "effect";

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

/** Local-storage key shared by the document bootstrap and the theme store. */
export const THEME_STORAGE_KEY = "theme";

/** First-visit theme shared by the document bootstrap and the theme store. */
export const DEFAULT_THEME = "system" satisfies ThemeValue;

/** A visitor's stored choice, which "system" leaves to the device. */
export type ThemeChoice = ThemeValue;

/** A theme that names a class on the document root. */
export type ConcreteTheme = Exclude<ThemeValue, "system">;

/** Concrete class names managed on the document root. */
export const concreteThemeValues = themes.flatMap((theme) =>
  theme.appearance === "dynamic" ? [] : [theme.value]
);

function isThemeChoice(value: string): value is ThemeChoice {
  return themes.some((theme) => theme.value === value);
}

/** Reads a stored choice. An absent or unknown value is the default theme. */
export function parseThemeChoice(stored: Option.Option<string>): ThemeChoice {
  return Option.getOrElse(
    Option.filter(stored, isThemeChoice),
    () => DEFAULT_THEME
  );
}

/** The concrete theme of a choice under the system appearance. */
export function resolveThemeChoice(
  theme: ThemeChoice,
  systemAppearance: ThemeAppearance
): ConcreteTheme {
  return theme === "system" ? systemAppearance : theme;
}

/**
 * Resolves a runtime theme value to the concrete appearance consumers should
 * render. Unknown and pre-hydration values use Nakafa's light default.
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
