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
  "apple",
  "banana",
  "jerky",
  "granola",
  "raisin",
  "peanut",
  "almond",
  "cashew",
  "walnut",
  "pecan",
  "grape",
  "orange",
  "mango",
  "berry",
  "cherry",
  "peach",
  "plum",
  "carrot",
  "celery",
  "hummus",
  "olive",
  "pickle",
  "salsa",
  "guac",
  "dip",
  "bar",
  "mix",
  "trail",
  "cereal",
  "muffin",
  "donut",
  "bagel",
  "toast",
  "waffle",
  "pancake",
  "honey",
  "jam",
  "butter",
  "spread",
  "rice",
  "corn",
  "oat",
  "wheat",
  "biscuit",
  "brownie",
  "cake",
  "pie",
  "tart",
  "fudge",
  "truffle",
  "caramel",
  "toffee",
  "nougat",
  "mint",
  "gum",
  "lolly",
  "jelly",
  "gummy",
  "marsh",
  "taffy",
  "brittle",
  "choco",
  "vanilla",
  "sugar",
  "salt",
  "pepper",
  "spice",
  "herb",
  "seed",
  "bean",
  "lentil",
  "pea",
  "soy",
  "tofu",
  "seaweed",
  "kelp",
  "kale",
  "spinach",
  "lettuce",
  "tomato",
  "onion",
  "garlic",
  "ginger",
  "basil",
  "parsley",
  "roll",
  "wrap",
  "stick",
  "crisp",
  "square",
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
 * import codename from "codenames/snacks-100";
 * codename(1234) // "brittle"
 * ```
 */
export const codename = createTypedCodename(snacks);

export default codename;
