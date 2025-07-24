/**
 * Auto-generated from colors.txt. Do not edit manually.
 * Run 'bun run scripts/generate.ts colors Color' to regenerate.
 *
 * SPDX-FileCopyrightText: 2025-present Kriasoft
 * SPDX-License-Identifier: MIT
 */

import { createTypedCodename } from "../core/factory.js";

export const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "black",
  "white",
  "gray",
  "pink",
  "orange",
  "purple",
  "brown",
  "gold",
  "silver",
  "tan",
  "navy",
  "beige",
  "lime",
  "cyan",
  "coral",
  "violet",
  "maroon",
  "olive",
  "teal",
  "rose",
  "amber",
  "ruby",
  "jade",
  "bronze",
  "copper",
  "pearl",
  "cream",
  "sky",
  "forest",
  "ocean",
  "sunset",
  "peach",
  "mint",
  "sage",
  "wine",
  "rust",
  "sand",
  "snow",
  "cherry",
  "grape",
  "lemon",
  "plum",
  "aqua",
  "crimson",
  "emerald",
  "ivory",
] as const;

export type Color = (typeof colors)[number];

/**
 * Converts a number to a Color codename
 *
 * @param input - The number to convert
 * @returns A Color name
 *
 * @example
 * ```typescript
 * import codename from "codenames/colors-50";
 * codename(1234) // "maroon"
 * ```
 */
export const codename = createTypedCodename(colors);

export default codename;
