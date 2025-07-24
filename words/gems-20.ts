/**
 * Auto-generated from gems.txt. Do not edit manually.
 * Run 'bun run scripts/generate.ts gems Gem' to regenerate.
 *
 * SPDX-FileCopyrightText: 2025-present Kriasoft
 * SPDX-License-Identifier: MIT
 */

import { createTypedCodename } from "../core/factory.js";

export const gems = [
  "ruby",
  "pearl",
  "jade",
  "opal",
  "amber",
  "diamond",
  "emerald",
  "gold",
  "silver",
  "topaz",
  "crystal",
  "garnet",
  "coral",
  "onyx",
  "agate",
  "jasper",
  "quartz",
  "citrine",
  "zircon",
  "beryl",
] as const;

export type Gem = (typeof gems)[number];

/**
 * Converts a number to a Gem codename
 *
 * @param input - The number to convert
 * @returns A Gem name
 *
 * @example
 * ```typescript
 * import codename from "codenames/gems-20";
 * codename(1234) // "crystal"
 * ```
 */
export const codename = createTypedCodename(gems);

export default codename;
