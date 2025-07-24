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
  "iraq",
  "cuba",
  "chile",
  "kenya",
  "ghana",
  "mali",
  "nepal",
  "israel",
  "qatar",
  "oman",
  "syria",
  "yemen",
  "libya",
  "sudan",
  "jordan",
  "panama",
  "vietnam",
  "austria",
  "belgium",
  "ireland",
  "finland",
  "denmark",
  "hungary",
  "iceland",
  "croatia",
  "serbia",
  "ukraine",
  "albania",
  "estonia",
  "latvia",
  "armenia",
  "georgia",
  "belarus",
  "bolivia",
  "ecuador",
  "uruguay",
  "jamaica",
  "haiti",
  "fiji",
  "kuwait",
  "malta",
  "monaco",
  "morocco",
  "algeria",
  "tunisia",
  "uganda",
  "rwanda",
  "angola",
  "zambia",
  "namibia",
  "nigeria",
  "senegal",
  "liberia",
  "guinea",
  "gabon",
  "benin",
  "togo",
  "niger",
  "chad",
  "congo",
  "somalia",
  "eritrea",
  "malawi",
  "lesotho",
  "burundi",
  "comoros",
  "gambia",
  "bhutan",
  "laos",
  "myanmar",
  "taiwan",
  "cyprus",
  "lebanon",
  "bahamas",
  "tonga",
  "samoa",
  "nauru",
  "tuvalu",
  "belize",
  "andorra",
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
 * import codename from "codenames/countries-100";
 * codename(1234) // "nigeria"
 * ```
 */
export const codename = createTypedCodename(countries);

export default codename;
