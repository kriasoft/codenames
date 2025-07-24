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
  "dubnium",
  "bohrium",
  "hassium",
  "curium",
  "fermium",
  "nobelium",
  "lawrencium",
  "rutherfordium",
  "seaborgium",
  "meitnerium",
  "darmstadtium",
  "roentgenium",
  "copernicium",
  "nihonium",
  "flerovium",
  "moscovium",
  "livermorium",
  "tennessine",
  "oganesson",
  "americium",
  "berkelium",
  "californium",
  "einsteinium",
  "mendelevium",
  "neptunium",
  "plutonium",
  "actinium",
  "francium",
  "polonium",
  "astatine",
  "scandium",
  "titanium",
  "vanadium",
  "manganese",
  "germanium",
  "selenium",
  "rubidium",
  "strontium",
  "zirconium",
  "molybdenum",
  "technetium",
  "ruthenium",
  "palladium",
  "antimony",
  "tellurium",
  "lanthanum",
  "praseodymium",
  "neodymium",
  "promethium",
  "samarium",
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
 * import codename from "codenames/elements-100";
 * codename(1234) // "berkelium"
 * ```
 */
export const codename = createTypedCodename(elements);

export default codename;
