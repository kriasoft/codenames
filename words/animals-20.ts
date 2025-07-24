/**
 * Auto-generated from animals.txt. Do not edit manually.
 * Run 'bun run scripts/generate.ts animals Animal' to regenerate.
 *
 * SPDX-FileCopyrightText: 2025-present Kriasoft
 * SPDX-License-Identifier: MIT
 */

import { createTypedCodename } from "../core/factory.js";

export const animals = [
  "cat",
  "dog",
  "fish",
  "bird",
  "cow",
  "pig",
  "bee",
  "ant",
  "bat",
  "fly",
  "rat",
  "fox",
  "owl",
  "bear",
  "duck",
  "hen",
  "frog",
  "crab",
  "goat",
  "lion",
] as const;

export type Animal = (typeof animals)[number];

/**
 * Converts a number to a Animal codename
 *
 * @param input - The number to convert
 * @returns An Animal name
 *
 * @example
 * ```typescript
 * import codename from "codenames/animals-20";
 * codename(1234) // "rat"
 * ```
 */
export const codename = createTypedCodename(animals);

export default codename;
