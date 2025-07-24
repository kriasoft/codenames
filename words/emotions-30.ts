/**
 * Auto-generated from emotions.txt. Do not edit manually.
 * Run 'bun run scripts/generate.ts emotions Emotion' to regenerate.
 *
 * SPDX-FileCopyrightText: 2025-present Kriasoft
 * SPDX-License-Identifier: MIT
 */

import { createTypedCodename } from "../core/factory.js";

export const emotions = [
  "love",
  "hate",
  "joy",
  "sad",
  "fear",
  "mad",
  "happy",
  "angry",
  "glad",
  "calm",
  "hurt",
  "proud",
  "shame",
  "hope",
  "pain",
  "guilt",
  "trust",
  "envy",
  "grief",
  "worry",
  "peace",
  "shock",
  "lonely",
  "brave",
  "scared",
  "tired",
  "eager",
  "bored",
  "sorry",
  "lost",
] as const;

export type Emotion = (typeof emotions)[number];

/**
 * Converts a number to a Emotion codename
 *
 * @param input - The number to convert
 * @returns An Emotion name
 *
 * @example
 * ```typescript
 * import codename from "codenames/emotions-30";
 * codename(1234) // "hurt"
 * ```
 */
export const codename = createTypedCodename(emotions);

export default codename;
