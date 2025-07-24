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
  "spinel",
  "peridot",
  "jet",
  "gem",
  "stone",
  "rock",
  "jewel",
  "ore",
  "lapis",
  "azurite",
  "calcite",
  "pyrite",
  "iolite",
  "kunzite",
  "kyanite",
  "axinite",
  "barite",
  "biotite",
  "bixbite",
  "boleite",
  "bornite",
  "brucite",
  "cuprite",
  "epidote",
  "euclase",
  "galena",
  "gypsum",
  "halite",
  "howlite",
  "jadeite",
  "olivine",
  "realgar",
  "rutile",
  "sphene",
  "sulfur",
  "talc",
  "thulite",
  "ulexite",
  "zeolite",
  "zincite",
  "zoisite",
  "apatite",
  "augite",
  "albite",
  "alunite",
  "anatase",
  "apophyl",
  "basalt",
  "bismuth",
  "boleite",
  "carneli",
  "celesti",
  "chromit",
  "corundu",
  "cryolit",
  "cuprite",
  "datolit",
  "diaspor",
  "diopsid",
  "dioptas",
  "dolomit",
  "epidote",
  "euclase",
  "fayalit",
  "fluorit",
  "gahnite",
  "gibsit",
  "goethit",
  "graphit",
  "gummite",
  "halite",
  "helvite",
  "hercyni",
  "hessite",
  "hidenit",
  "hodgkin",
  "holmqui",
  "hopeite",
  "huebner",
  "melanit",
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
 * import codename from "codenames/gems-100";
 * codename(1234) // "carneli"
 * ```
 */
export const codename = createTypedCodename(gems);

export default codename;
