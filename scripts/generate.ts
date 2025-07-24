/**
 * Generate `words/<list>-<limit>.ts` files from the curated word lists
 * `words/<list>.txt`.
 *
 * Usage: bun run ./scripts/generate.ts <list> <TypeName>
 * Example: bun run ./scripts/generate.ts cities City
 *
 * SPDX-FileCopyrightText: 2025-present Kriasoft
 * SPDX-License-Identifier: MIT
 */

import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { readdirSync } from "node:fs";
import { codename } from "../core/index.js";

/**
 * Get the appropriate article (a/an) for a word
 */
function getArticle(word: string): string {
  const vowels = ["a", "e", "i", "o", "u"];
  return vowels.includes(word.toLowerCase().charAt(0)) ? "An" : "A";
}

async function generateAllFile() {
  console.log("Generating words/all.ts...");

  // Get all theme files from words directory
  const wordFiles = readdirSync("words")
    .filter((file) => file.endsWith(".txt"))
    .map((file) => file.replace(".txt", ""))
    .sort();

  const limits = [10, 20, 30, 50, 100];

  // Generate imports
  const imports: string[] = [];
  const themeEntries: string[] = [];
  const themesArray: string[] = [];
  const switchCases: string[] = [];

  for (const theme of wordFiles) {
    for (const limit of limits) {
      const themeName = `${theme}-${limit}`;
      const importName = `${theme}${limit}`;

      imports.push(`import ${importName} from "./${themeName}.js";`);
      themeEntries.push(`  | "${themeName}"`);
      themesArray.push(`  "${themeName}",`);
      switchCases.push(
        `    case "${themeName}":\n      return ${importName}(input);`,
      );
    }
  }

  const content = `/**
 * Auto-generated theme aggregator file. Do not edit manually.
 * Run 'bun run scripts/generate.ts all' to regenerate.
 *
 * SPDX-FileCopyrightText: 2025-present Kriasoft
 * SPDX-License-Identifier: MIT
 */

${imports.join("\n")}

export type Theme =
${themeEntries.join("\n")};

/**
 * Array of all available theme names for discoverability and validation.
 */
export const themes: readonly Theme[] = [
${themesArray.join("\n")}
] as const;

/**
 * Converts a number to a human-readable codename using the specified theme.
 *
 * @param input - The number to convert
 * @param theme - The theme name to use
 * @returns A string codename
 *
 * @example
 * \`\`\`typescript
 * import codename from "codenames/all";
 * codename(123, "cities-20") // "tokyo"
 * codename(456, "animals-50") // "cat"
 * \`\`\`
 */
export function codename(input: number, theme: Theme): string {
  switch (theme) {
${switchCases.join("\n\n")}

    default:
      throw new Error(
        \`Unknown theme: \${theme}. Available themes: \${themes.join(", ")}\`,
      );
  }
}

export default codename;
`;

  await writeFile("words/all.ts", content);
  console.log("Generated words/all.ts");
}

const [list, listItemName] = Bun.argv.slice(2);

if (!list) {
  console.error("Usage: bun run ./scripts/generate.ts <list> <TypeName>");
  console.error("       bun run ./scripts/generate.ts all");
  console.error("Example: bun run ./scripts/generate.ts cities City");
  process.exit(1);
}

// Handle special "all" case
if (list === "all") {
  await generateAllFile();
  process.exit(0);
}

if (!listItemName) {
  console.error("Usage: bun run ./scripts/generate.ts <list> <TypeName>");
  console.error("       bun run ./scripts/generate.ts all");
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
  const exampleOutput = codename(1234, selectedWords);
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
 *
 * @param input - The number to convert
 * @returns ${getArticle(listItemName)} ${listItemName} name
 *
 * @example
 * \`\`\`typescript
 * import codename from "codenames/${list}-${limit}";
 * codename(1234) // "${exampleOutput}"
 * \`\`\`
 */
export const codename = createTypedCodename(${list});

export default codename;
`;

  const tsPath = join("words", `${list}-${limit}.ts`);
  await writeFile(tsPath, tsContent);
  console.log(`  Generated ${tsPath}`);
}
