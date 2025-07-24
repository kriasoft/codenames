/**
 * Auto-generated from adjectives.txt. Do not edit manually.
 * Run 'bun run scripts/generate.ts adjectives Adjective' to regenerate.
 *
 * SPDX-FileCopyrightText: 2025-present Kriasoft
 * SPDX-License-Identifier: MIT
 */

import { createTypedCodename } from "../core/factory.js";

export const adjectives = [
  "good",
  "bad",
  "big",
  "small",
  "new",
  "old",
  "hot",
  "cold",
  "fast",
  "slow",
] as const;

export type Adjective = (typeof adjectives)[number];

/**
 * Converts a number to a Adjective codename
 *
 * @param input - The number to convert
 * @returns An Adjective name
 *
 * @example
 * ```typescript
 * import codename from "codenames/adjectives-10";
 * codename(1234) // "good"
 * ```
 */
export const codename = createTypedCodename(adjectives);

export default codename;
