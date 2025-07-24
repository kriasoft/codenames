/**
 * Auto-generated from snacks.txt. Do not edit manually.
 * Run 'bun run scripts/generate.ts snacks Snack' to regenerate.
 *
 * SPDX-FileCopyrightText: 2025-present Kriasoft
 * SPDX-License-Identifier: MIT
 */

import { createTypedCodename } from "../core/factory.js";

export const snacks = [
  "chips",
  "nuts",
  "cookie",
  "pretzel",
  "popcorn",
  "candy",
  "fruit",
  "cheese",
  "cracker",
  "yogurt",
] as const;

export type Snack = (typeof snacks)[number];

/**
 * Converts a number to a Snack codename
 *
 * @param input - The number to convert
 * @returns A Snack name
 *
 * @example
 * ```typescript
 * import codename from "codenames/snacks-10";
 * codename(1234) // "chips"
 * ```
 */
export const codename = createTypedCodename(snacks);

export default codename;
