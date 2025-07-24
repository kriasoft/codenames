import { codename } from "./index.js";

/**
 * Creates a codename function for a specific word list.
 *
 * @param words - Array of words to use for codenames
 * @returns A function that converts numbers to codenames
 *
 * @example
 * ```typescript
 * import { createCodename } from "codenames/core";
 * const cityCodename = createCodename(["paris", "london", "tokyo"]);
 * cityCodename(1234) // "london"
 * ```
 */
export function createCodename(words: readonly string[]) {
  return (input: number): string => codename(input, words);
}

/**
 * Creates a typed codename function for a specific word list.
 *
 * @param words - Array of words to use for codenames
 * @returns A function that converts numbers to codenames with proper typing
 */
export function createTypedCodename<T extends readonly string[]>(words: T) {
  return (input: number): T[number] => codename(input, words) as T[number];
}
