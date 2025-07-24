/* SPDX-FileCopyrightText: 2025-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { cities } from "./words/cities-20.js";
import { codename as codenameCore } from "./core/index.js";

/**
 * Converts a number to a human-readable codename using the provided word list.
 *
 * @param input - The number to convert
 * @param words - Optional array of words to use for codenames (defaults to cities-20)
 * @returns A string codename
 *
 * @example
 * ```typescript
 * import { codename } from "codenames";
 * codename(1234) // "london" (using default cities-20)
 * codename(1234, ["one", "two", "three"]) // "two"
 * ```
 */
export function codename(input: number, words?: readonly string[]): string {
  return codenameCore(input, words ?? cities);
}

/**
 * Converts a number to a human-readable codename using cities-20 list by default.
 *
 * @param input - The number to convert
 * @param words - Optional array of words to use for codenames (defaults to cities-20)
 * @returns A string codename
 *
 * @example
 * ```typescript
 * import codename from "codenames";
 * codename(1234) // "london"
 * ```
 */
export default function defaultCodename(
  input: number,
  words?: readonly string[],
): string {
  return codenameCore(input, words ?? cities);
}
