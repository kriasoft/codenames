/**
 * Auto-generated from clothing.txt. Do not edit manually.
 * Run 'bun run scripts/generate.ts clothing Clothing' to regenerate.
 *
 * SPDX-FileCopyrightText: 2025-present Kriasoft
 * SPDX-License-Identifier: MIT
 */

import { createTypedCodename } from "../core/factory.js";

export const clothing = [
  "shirt",
  "jeans",
  "shoe",
  "hat",
  "sock",
  "dress",
  "coat",
  "belt",
  "tie",
  "pants",
  "glove",
  "jacket",
  "boot",
  "skirt",
  "vest",
  "suit",
  "cap",
  "bag",
  "scarf",
  "bra",
] as const;

export type Clothing = (typeof clothing)[number];

/**
 * Converts a number to a Clothing codename
 *
 * @param input - The number to convert
 * @returns A Clothing name
 *
 * @example
 * ```typescript
 * import codename from "codenames/clothing-20";
 * codename(1234) // "glove"
 * ```
 */
export const codename = createTypedCodename(clothing);

export default codename;
