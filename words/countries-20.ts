/**
 * Auto-generated from countries.txt. Do not edit manually.
 * Run 'bun run scripts/generate.ts countries Country' to regenerate.
 *
 * SPDX-FileCopyrightText: 2025-present Kriasoft
 * SPDX-License-Identifier: MIT
 */

import { createTypedCodename } from "../core/factory.js";

export const countries = [
  "china",
  "japan",
  "india",
  "france",
  "italy",
  "spain",
  "canada",
  "mexico",
  "brazil",
  "germany",
  "russia",
  "egypt",
  "greece",
  "turkey",
  "poland",
  "sweden",
  "norway",
  "korea",
  "iran",
  "peru",
] as const;

export type Country = (typeof countries)[number];

/**
 * Converts a number to a Country codename
 *
 * @param input - The number to convert
 * @returns A Country name
 *
 * @example
 * ```typescript
 * import codename from "codenames/countries-20";
 * codename(1234) // "russia"
 * ```
 */
export const codename = createTypedCodename(countries);

export default codename;
