/**
 * Auto-generated from elements.txt. Do not edit manually.
 * Run 'bun run scripts/generate.ts elements Element' to regenerate.
 *
 * SPDX-FileCopyrightText: 2025-present Kriasoft
 * SPDX-License-Identifier: MIT
 */

import { createTypedCodename } from "../core/factory.js";

export const elements = [
  "gold",
  "iron",
  "lead",
  "zinc",
  "tin",
  "copper",
  "silver",
  "carbon",
  "oxygen",
  "helium",
  "neon",
  "argon",
  "sodium",
  "sulfur",
  "silicon",
  "boron",
  "lithium",
  "calcium",
  "mercury",
  "arsenic",
  "uranium",
  "radium",
  "nickel",
  "cobalt",
  "chrome",
  "bromine",
  "iodine",
  "xenon",
  "krypton",
  "radon",
  "cesium",
  "barium",
  "gallium",
  "indium",
  "bismuth",
  "cadmium",
  "rhodium",
  "osmium",
  "hafnium",
  "rhenium",
  "iridium",
  "thorium",
  "cerium",
  "erbium",
  "terbium",
  "holmium",
  "thulium",
  "yttrium",
  "niobium",
  "tantalum",
] as const;

export type Element = (typeof elements)[number];

/**
 * Converts a number to a Element codename
 *
 * @param input - The number to convert
 * @returns An Element name
 *
 * @example
 * ```typescript
 * import codename from "codenames/elements-50";
 * codename(1234) // "uranium"
 * ```
 */
export const codename = createTypedCodename(elements);

export default codename;
