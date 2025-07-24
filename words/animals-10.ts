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
 * import codename from "codenames/animals-10";
 * codename(1234) // "cat"
 * ```
 */
export const codename = createTypedCodename(animals);

export default codename;
