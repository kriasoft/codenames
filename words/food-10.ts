/**
 * Auto-generated from food.txt. Do not edit manually.
 * Run 'bun run scripts/generate.ts food Food' to regenerate.
 *
 * SPDX-FileCopyrightText: 2025-present Kriasoft
 * SPDX-License-Identifier: MIT
 */

import { createTypedCodename } from "../core/factory.js";

export const food = [
  "bread",
  "milk",
  "egg",
  "rice",
  "meat",
  "fish",
  "cake",
  "apple",
  "cheese",
  "pasta",
] as const;

export type Food = (typeof food)[number];

/**
 * Converts a number to a Food codename
 *
 * @param input - The number to convert
 * @returns A Food name
 *
 * @example
 * ```typescript
 * import codename from "codenames/food-10";
 * codename(1234) // "bread"
 * ```
 */
export const codename = createTypedCodename(food);

export default codename;
