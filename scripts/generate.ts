/**
 * Generate `words/<list>-<limit>.ts` files from the curated word lists
 * `words/<list>.txt`.
 *
 * Usage: bun run ./scripts/generate.ts <list> <TypeName>
 * Example: bun run ./scripts/generate.ts cities City
 */

import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const [list, listItemName] = Bun.argv.slice(2);

if (!list || !listItemName) {
  console.error("Usage: bun run ./scripts/generate.ts <list> <TypeName>");
  console.error("Example: bun run ./scripts/generate.ts cities City");
  process.exit(1);
}

const limits = [10, 20, 30, 50, 100];

// Read the word list
const words = (await readFile(`words/${list}.txt`, "utf-8"))
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

console.log(`Processing ${list}.txt (${words.length} words)...`);

// Generate files for different limits
for (const limit of limits) {
  if (words.length < limit) {
    console.warn(
      `  Skipping ${list}-${limit}.ts (only ${words.length} words available)`,
    );
    continue;
  }

  const selectedWords = words.slice(0, limit);
  const tsContent = `/**
 * Auto-generated from ${list}.txt. Do not edit manually.
 * Run 'bun run scripts/generate.ts ${list} ${listItemName}' to regenerate.
 *
 * SPDX-FileCopyrightText: 2025-present Kriasoft
 * SPDX-License-Identifier: MIT
 */

import { createTypedCodename } from "../core/factory.js";

export const ${list} = [
${selectedWords.map((word) => `  "${word}",`).join("\n")}
] as const;

export type ${listItemName} = (typeof ${list})[number];

/**
 * Converts a number to a ${listItemName} codename
 * @param input - The number to convert
 * @returns A ${listItemName} name
 * @example
 * \`\`\`typescript
 * import codename from "codenames/${list}-${limit}";
 * codename(1234) // "${words[0]}"
 * \`\`\`
 */
const codename = createTypedCodename(${list});

export default codename;
`;

  const tsPath = join("words", `${list}-${limit}.ts`);
  await writeFile(tsPath, tsContent);
  console.log(`  Generated ${tsPath}`);
}
