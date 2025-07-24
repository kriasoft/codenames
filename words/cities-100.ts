/**
 * Auto-generated from cities.txt. Do not edit manually.
 * Run 'bun run scripts/generate.ts cities City' to regenerate.
 *
 * SPDX-FileCopyrightText: 2025-present Kriasoft
 * SPDX-License-Identifier: MIT
 */

import { createTypedCodename } from "../core/factory.js";

export const cities = [
  "paris",
  "london",
  "rome",
  "tokyo",
  "berlin",
  "madrid",
  "sydney",
  "moscow",
  "cairo",
  "dubai",
  "milan",
  "oslo",
  "seoul",
  "miami",
  "vegas",
  "vienna",
  "athens",
  "dublin",
  "zurich",
  "geneva",
  "lisbon",
  "munich",
  "venice",
  "prague",
  "warsaw",
  "delhi",
  "mumbai",
  "boston",
  "denver",
  "dallas",
  "austin",
  "chicago",
  "toronto",
  "mexico",
  "havana",
  "lima",
  "bangkok",
  "manila",
  "jakarta",
  "hanoi",
  "lagos",
  "nairobi",
  "tunis",
  "rabat",
  "accra",
  "dakar",
  "seattle",
  "phoenix",
  "atlanta",
  "detroit",
  "houston",
  "kyoto",
  "osaka",
  "quebec",
  "ottawa",
  "monaco",
  "malta",
  "bern",
  "oxford",
  "perth",
  "darwin",
  "calgary",
  "panama",
  "bogota",
  "quito",
  "brussels",
  "bruges",
  "ghent",
  "bristol",
  "leeds",
  "utrecht",
  "antwerp",
  "taipei",
  "nagoya",
  "kobe",
  "sendai",
  "sapporo",
  "nagano",
  "agra",
  "pune",
  "surat",
  "jaipur",
  "indore",
  "bhopal",
  "lucknow",
  "kanpur",
  "patna",
  "ranchi",
  "raipur",
  "chennai",
  "dhaka",
  "karachi",
  "kigali",
  "luanda",
  "maputo",
  "harare",
  "halifax",
  "naha",
  "fukuoka",
  "naples",
] as const;

export type City = (typeof cities)[number];

/**
 * Converts a number to a City codename
 *
 * @param input - The number to convert
 * @returns A City name
 *
 * @example
 * ```typescript
 * import codename from "codenames/cities-100";
 * codename(1234) // "utrecht"
 * ```
 */
export const codename = createTypedCodename(cities);

export default codename;
