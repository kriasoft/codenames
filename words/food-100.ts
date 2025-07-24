/**
 * Auto-generated from food.txt. Do not edit manually.
 * Run 'bun run scripts/generate.ts food Food' to regenerate.
 *
 * SPDX-FileCopyrightText: 2025-present Kriasoft
 * SPDX-License-Identifier: MIT
 */

import { createTypedCodename } from "../core/factory.js";

export const food = [
  "bread",
  "milk",
  "egg",
  "rice",
  "meat",
  "fish",
  "cake",
  "apple",
  "cheese",
  "pasta",
  "pizza",
  "soup",
  "salad",
  "chicken",
  "beef",
  "pork",
  "bacon",
  "butter",
  "sugar",
  "salt",
  "honey",
  "tea",
  "coffee",
  "juice",
  "water",
  "wine",
  "beer",
  "cookie",
  "pie",
  "ice",
  "cream",
  "candy",
  "chips",
  "burger",
  "taco",
  "toast",
  "yogurt",
  "fruit",
  "bean",
  "corn",
  "carrot",
  "potato",
  "tomato",
  "onion",
  "garlic",
  "lemon",
  "orange",
  "grape",
  "peach",
  "pear",
  "cherry",
  "berry",
  "melon",
  "mango",
  "kiwi",
  "lime",
  "mint",
  "basil",
  "herb",
  "spice",
  "sauce",
  "gravy",
  "olive",
  "nut",
  "almond",
  "peanut",
  "cashew",
  "walnut",
  "seed",
  "grain",
  "wheat",
  "oat",
  "flour",
  "dough",
  "snack",
  "treat",
  "meal",
  "lunch",
  "dinner",
  "dish",
  "plate",
  "bowl",
  "fork",
  "knife",
  "spoon",
  "muffin",
  "bagel",
  "waffle",
  "pancake",
  "syrup",
  "jelly",
  "pickle",
  "mustard",
  "ketchup",
  "mayo",
  "soda",
  "shake",
  "smoothie",
  "biscuit",
  "donut",
] as const;

export type Food = (typeof food)[number];

/**
 * Converts a number to a Food codename
 *
 * @param input - The number to convert
 * @returns A Food name
 *
 * @example
 * ```typescript
 * import codename from "codenames/food-100";
 * codename(1234) // "wheat"
 * ```
 */
export const codename = createTypedCodename(food);

export default codename;
