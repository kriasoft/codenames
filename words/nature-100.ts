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
  "ocean",
  "forest",
  "plant",
  "storm",
  "flower",
  "bird",
  "fish",
  "lake",
  "soil",
  "seed",
  "air",
  "stone",
  "beach",
  "wave",
  "light",
  "branch",
  "root",
  "stream",
  "valley",
  "pond",
  "dew",
  "bloom",
  "field",
  "shore",
  "cliff",
  "spring",
  "desert",
  "cave",
  "mud",
  "fog",
  "reef",
  "meadow",
  "island",
  "garden",
  "jungle",
  "swamp",
  "pine",
  "rose",
  "oak",
  "moss",
  "fern",
  "eagle",
  "bear",
  "deer",
  "wolf",
  "bee",
  "ant",
  "fox",
  "owl",
  "hawk",
  "snake",
  "frog",
  "coral",
  "shark",
  "whale",
  "salmon",
  "thorn",
  "bark",
  "petal",
  "pollen",
  "nectar",
  "sunrise",
  "sunset",
  "thunder",
  "drought",
  "frost",
  "glacier",
  "volcano",
  "canyon",
  "delta",
  "dune",
  "tide",
  "aurora",
  "summit",
  "grove",
  "prairie",
  "ridge",
  "slope",
  "trail",
  "woods",
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
 * import codename from "codenames/nature-100";
 * codename(1234) // "snake"
 * ```
 */
export const codename = createTypedCodename(nature);

export default codename;
