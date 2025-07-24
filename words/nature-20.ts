/**
 * Auto-generated from nature.txt. Do not edit manually.
 * Run 'bun run scripts/generate.ts nature Nature' to regenerate.
 *
 * SPDX-FileCopyrightText: 2025-present Kriasoft
 * SPDX-License-Identifier: MIT
 */

import { createTypedCodename } from "../core/factory.js";

export const nature = [
  "tree",
  "sun",
  "sky",
  "rain",
  "moon",
  "star",
  "wind",
  "sea",
  "water",
  "rock",
  "leaf",
  "fire",
  "cloud",
  "grass",
  "snow",
  "earth",
  "ice",
  "river",
  "hill",
  "sand",
] as const;

export type Nature = (typeof nature)[number];

/**
 * Converts a number to a Nature codename
 *
 * @param input - The number to convert
 * @returns A Nature name
 *
 * @example
 * ```typescript
 * import codename from "codenames/nature-20";
 * codename(1234) // "leaf"
 * ```
 */
export const codename = createTypedCodename(nature);

export default codename;
