/**
 * Auto-generated theme aggregator file. Do not edit manually.
 * Run 'bun run scripts/generate.ts all' to regenerate.
 *
 * SPDX-FileCopyrightText: 2025-present Kriasoft
 * SPDX-License-Identifier: MIT
 */

import adjectives10 from "./adjectives-10.js";
import adjectives20 from "./adjectives-20.js";
import adjectives30 from "./adjectives-30.js";
import adjectives50 from "./adjectives-50.js";
import adjectives100 from "./adjectives-100.js";
import animals10 from "./animals-10.js";
import animals20 from "./animals-20.js";
import animals30 from "./animals-30.js";
import animals50 from "./animals-50.js";
import animals100 from "./animals-100.js";
import cities10 from "./cities-10.js";
import cities20 from "./cities-20.js";
import cities30 from "./cities-30.js";
import cities50 from "./cities-50.js";
import cities100 from "./cities-100.js";
import clothing10 from "./clothing-10.js";
import clothing20 from "./clothing-20.js";
import clothing30 from "./clothing-30.js";
import clothing50 from "./clothing-50.js";
import clothing100 from "./clothing-100.js";
import colors10 from "./colors-10.js";
import colors20 from "./colors-20.js";
import colors30 from "./colors-30.js";
import colors50 from "./colors-50.js";
import colors100 from "./colors-100.js";
import countries10 from "./countries-10.js";
import countries20 from "./countries-20.js";
import countries30 from "./countries-30.js";
import countries50 from "./countries-50.js";
import countries100 from "./countries-100.js";
import elements10 from "./elements-10.js";
import elements20 from "./elements-20.js";
import elements30 from "./elements-30.js";
import elements50 from "./elements-50.js";
import elements100 from "./elements-100.js";
import emotions10 from "./emotions-10.js";
import emotions20 from "./emotions-20.js";
import emotions30 from "./emotions-30.js";
import emotions50 from "./emotions-50.js";
import emotions100 from "./emotions-100.js";
import food10 from "./food-10.js";
import food20 from "./food-20.js";
import food30 from "./food-30.js";
import food50 from "./food-50.js";
import food100 from "./food-100.js";
import gems10 from "./gems-10.js";
import gems20 from "./gems-20.js";
import gems30 from "./gems-30.js";
import gems50 from "./gems-50.js";
import gems100 from "./gems-100.js";
import nature10 from "./nature-10.js";
import nature20 from "./nature-20.js";
import nature30 from "./nature-30.js";
import nature50 from "./nature-50.js";
import nature100 from "./nature-100.js";
import snacks10 from "./snacks-10.js";
import snacks20 from "./snacks-20.js";
import snacks30 from "./snacks-30.js";
import snacks50 from "./snacks-50.js";
import snacks100 from "./snacks-100.js";

export type Theme =
  | "adjectives-10"
  | "adjectives-20"
  | "adjectives-30"
  | "adjectives-50"
  | "adjectives-100"
  | "animals-10"
  | "animals-20"
  | "animals-30"
  | "animals-50"
  | "animals-100"
  | "cities-10"
  | "cities-20"
  | "cities-30"
  | "cities-50"
  | "cities-100"
  | "clothing-10"
  | "clothing-20"
  | "clothing-30"
  | "clothing-50"
  | "clothing-100"
  | "colors-10"
  | "colors-20"
  | "colors-30"
  | "colors-50"
  | "colors-100"
  | "countries-10"
  | "countries-20"
  | "countries-30"
  | "countries-50"
  | "countries-100"
  | "elements-10"
  | "elements-20"
  | "elements-30"
  | "elements-50"
  | "elements-100"
  | "emotions-10"
  | "emotions-20"
  | "emotions-30"
  | "emotions-50"
  | "emotions-100"
  | "food-10"
  | "food-20"
  | "food-30"
  | "food-50"
  | "food-100"
  | "gems-10"
  | "gems-20"
  | "gems-30"
  | "gems-50"
  | "gems-100"
  | "nature-10"
  | "nature-20"
  | "nature-30"
  | "nature-50"
  | "nature-100"
  | "snacks-10"
  | "snacks-20"
  | "snacks-30"
  | "snacks-50"
  | "snacks-100";

/**
 * Array of all available theme names for discoverability and validation.
 */
export const themes: readonly Theme[] = [
  "adjectives-10",
  "adjectives-20",
  "adjectives-30",
  "adjectives-50",
  "adjectives-100",
  "animals-10",
  "animals-20",
  "animals-30",
  "animals-50",
  "animals-100",
  "cities-10",
  "cities-20",
  "cities-30",
  "cities-50",
  "cities-100",
  "clothing-10",
  "clothing-20",
  "clothing-30",
  "clothing-50",
  "clothing-100",
  "colors-10",
  "colors-20",
  "colors-30",
  "colors-50",
  "colors-100",
  "countries-10",
  "countries-20",
  "countries-30",
  "countries-50",
  "countries-100",
  "elements-10",
  "elements-20",
  "elements-30",
  "elements-50",
  "elements-100",
  "emotions-10",
  "emotions-20",
  "emotions-30",
  "emotions-50",
  "emotions-100",
  "food-10",
  "food-20",
  "food-30",
  "food-50",
  "food-100",
  "gems-10",
  "gems-20",
  "gems-30",
  "gems-50",
  "gems-100",
  "nature-10",
  "nature-20",
  "nature-30",
  "nature-50",
  "nature-100",
  "snacks-10",
  "snacks-20",
  "snacks-30",
  "snacks-50",
  "snacks-100",
] as const;

/**
 * Converts a number to a human-readable codename using the specified theme.
 *
 * @param input - The number to convert
 * @param theme - The theme name to use
 * @returns A string codename
 *
 * @example
 * ```typescript
 * import codename from "codenames/all";
 * codename(123, "cities-20") // "tokyo"
 * codename(456, "animals-50") // "cat"
 * ```
 */
export function codename(input: number, theme: Theme): string {
  switch (theme) {
    case "adjectives-10":
      return adjectives10(input);

    case "adjectives-20":
      return adjectives20(input);

    case "adjectives-30":
      return adjectives30(input);

    case "adjectives-50":
      return adjectives50(input);

    case "adjectives-100":
      return adjectives100(input);

    case "animals-10":
      return animals10(input);

    case "animals-20":
      return animals20(input);

    case "animals-30":
      return animals30(input);

    case "animals-50":
      return animals50(input);

    case "animals-100":
      return animals100(input);

    case "cities-10":
      return cities10(input);

    case "cities-20":
      return cities20(input);

    case "cities-30":
      return cities30(input);

    case "cities-50":
      return cities50(input);

    case "cities-100":
      return cities100(input);

    case "clothing-10":
      return clothing10(input);

    case "clothing-20":
      return clothing20(input);

    case "clothing-30":
      return clothing30(input);

    case "clothing-50":
      return clothing50(input);

    case "clothing-100":
      return clothing100(input);

    case "colors-10":
      return colors10(input);

    case "colors-20":
      return colors20(input);

    case "colors-30":
      return colors30(input);

    case "colors-50":
      return colors50(input);

    case "colors-100":
      return colors100(input);

    case "countries-10":
      return countries10(input);

    case "countries-20":
      return countries20(input);

    case "countries-30":
      return countries30(input);

    case "countries-50":
      return countries50(input);

    case "countries-100":
      return countries100(input);

    case "elements-10":
      return elements10(input);

    case "elements-20":
      return elements20(input);

    case "elements-30":
      return elements30(input);

    case "elements-50":
      return elements50(input);

    case "elements-100":
      return elements100(input);

    case "emotions-10":
      return emotions10(input);

    case "emotions-20":
      return emotions20(input);

    case "emotions-30":
      return emotions30(input);

    case "emotions-50":
      return emotions50(input);

    case "emotions-100":
      return emotions100(input);

    case "food-10":
      return food10(input);

    case "food-20":
      return food20(input);

    case "food-30":
      return food30(input);

    case "food-50":
      return food50(input);

    case "food-100":
      return food100(input);

    case "gems-10":
      return gems10(input);

    case "gems-20":
      return gems20(input);

    case "gems-30":
      return gems30(input);

    case "gems-50":
      return gems50(input);

    case "gems-100":
      return gems100(input);

    case "nature-10":
      return nature10(input);

    case "nature-20":
      return nature20(input);

    case "nature-30":
      return nature30(input);

    case "nature-50":
      return nature50(input);

    case "nature-100":
      return nature100(input);

    case "snacks-10":
      return snacks10(input);

    case "snacks-20":
      return snacks20(input);

    case "snacks-30":
      return snacks30(input);

    case "snacks-50":
      return snacks50(input);

    case "snacks-100":
      return snacks100(input);

    default:
      throw new Error(
        `Unknown theme: ${theme}. Available themes: ${themes.join(", ")}`,
      );
  }
}

export default codename;
