/* SPDX-FileCopyrightText: 2025-present Kriasoft */
/* SPDX-License-Identifier: MIT */

/**
 * Converts a number to a human-readable codename using the provided word list.
 *
 * @param input - The number to convert
 * @param words - Array of words to use for codenames
 * @returns A string codename
 *
 * @example
 * ```typescript
 * import { codename } from "codenames/core";
 * codename(123, ["one", "two", "three"]) // "two"
 * ```
 */
export function codename(input: number, words: readonly string[]): string {
  if (!Number.isFinite(input)) {
    throw new Error(`Invalid input: expected a finite number, got ${input}`);
  }

  if (words.length === 0) {
    throw new Error("Word list cannot be empty");
  }

  const hash = fnv1a(input);
  const index = Math.abs(hash) % words.length;
  return words[index]!;
}

/**
 * FNV-1a hash function for consistent deterministic output.
 *
 * @param input - Number to hash
 * @returns 32-bit hash value
 */
function fnv1a(input: number): number {
  const FNV_PRIME = 0x01000193;
  const FNV_OFFSET_BASIS = 0x811c9dc5;

  let hash = FNV_OFFSET_BASIS;
  const bytes = numberToBytes(input);

  for (const byte of bytes) {
    hash ^= byte;
    hash = Math.imul(hash, FNV_PRIME);
  }

  return hash >>> 0;
}

/**
 * Convert number to byte array for hashing.
 *
 * @param num - Number to convert
 * @returns Array of bytes
 */
function numberToBytes(num: number): number[] {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setFloat64(0, num, true);
  return Array.from(new Uint8Array(buffer));
}

export default codename;
