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
 * import codename from "codenames/cities-50";
 * codename(1234) // "lisbon"
 * ```
 */
export const codename = createTypedCodename(cities);

export default codename;
