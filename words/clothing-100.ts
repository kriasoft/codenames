/**
 * Auto-generated from clothing.txt. Do not edit manually.
 * Run 'bun run scripts/generate.ts clothing Clothing' to regenerate.
 *
 * SPDX-FileCopyrightText: 2025-present Kriasoft
 * SPDX-License-Identifier: MIT
 */

import { createTypedCodename } from "../core/factory.js";

export const clothing = [
  "shirt",
  "jeans",
  "shoe",
  "hat",
  "sock",
  "dress",
  "coat",
  "belt",
  "tie",
  "pants",
  "glove",
  "jacket",
  "boot",
  "skirt",
  "vest",
  "suit",
  "cap",
  "bag",
  "scarf",
  "bra",
  "shorts",
  "watch",
  "ring",
  "heel",
  "tank",
  "tee",
  "blazer",
  "blouse",
  "purse",
  "bikini",
  "slip",
  "sandal",
  "loafer",
  "flat",
  "pump",
  "beanie",
  "mitten",
  "tights",
  "jumper",
  "kimono",
  "poncho",
  "tux",
  "shawl",
  "boxer",
  "brief",
  "thong",
  "cape",
  "gown",
  "frock",
  "tunic",
  "kilt",
  "smock",
  "apron",
  "corset",
  "romper",
  "sari",
  "turban",
  "toga",
  "fedora",
  "beret",
  "bowler",
  "visor",
  "slipper",
  "mule",
  "oxford",
  "wedge",
  "sneaker",
  "trainer",
  "polo",
  "cami",
  "halter",
  "panty",
  "girdle",
  "garter",
  "anklet",
  "brooch",
  "button",
  "buckle",
  "zipper",
  "collar",
  "cuff",
  "pocket",
  "hem",
  "sleeve",
  "lining",
  "thread",
  "fabric",
  "fleece",
  "flannel",
  "denim",
  "silk",
  "wool",
  "cotton",
  "lace",
  "velvet",
  "satin",
  "lycra",
  "nylon",
  "mesh",
  "tweed",
] as const;

export type Clothing = (typeof clothing)[number];

/**
 * Converts a number to a Clothing codename
 *
 * @param input - The number to convert
 * @returns A Clothing name
 *
 * @example
 * ```typescript
 * import codename from "codenames/clothing-100";
 * codename(1234) // "halter"
 * ```
 */
export const codename = createTypedCodename(clothing);

export default codename;
