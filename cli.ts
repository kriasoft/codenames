#!/usr/bin/env node

import process from "node:process";

// Import theme modules dynamically
const themes = {
  adjectives: () => import("./words/adjectives-100.js"),
  "adjectives-10": () => import("./words/adjectives-10.js"),
  "adjectives-20": () => import("./words/adjectives-20.js"),
  "adjectives-30": () => import("./words/adjectives-30.js"),
  "adjectives-50": () => import("./words/adjectives-50.js"),
  "adjectives-100": () => import("./words/adjectives-100.js"),
  animals: () => import("./words/animals-100.js"),
  "animals-10": () => import("./words/animals-10.js"),
  "animals-20": () => import("./words/animals-20.js"),
  "animals-30": () => import("./words/animals-30.js"),
  "animals-50": () => import("./words/animals-50.js"),
  "animals-100": () => import("./words/animals-100.js"),
  cities: () => import("./words/cities-100.js"),
  "cities-10": () => import("./words/cities-10.js"),
  "cities-20": () => import("./words/cities-20.js"),
  "cities-30": () => import("./words/cities-30.js"),
  "cities-50": () => import("./words/cities-50.js"),
  "cities-100": () => import("./words/cities-100.js"),
  clothing: () => import("./words/clothing-100.js"),
  "clothing-10": () => import("./words/clothing-10.js"),
  "clothing-20": () => import("./words/clothing-20.js"),
  "clothing-30": () => import("./words/clothing-30.js"),
  "clothing-50": () => import("./words/clothing-50.js"),
  "clothing-100": () => import("./words/clothing-100.js"),
  colors: () => import("./words/colors-100.js"),
  "colors-10": () => import("./words/colors-10.js"),
  "colors-20": () => import("./words/colors-20.js"),
  "colors-30": () => import("./words/colors-30.js"),
  "colors-50": () => import("./words/colors-50.js"),
  "colors-100": () => import("./words/colors-100.js"),
  countries: () => import("./words/countries-100.js"),
  "countries-10": () => import("./words/countries-10.js"),
  "countries-20": () => import("./words/countries-20.js"),
  "countries-30": () => import("./words/countries-30.js"),
  "countries-50": () => import("./words/countries-50.js"),
  "countries-100": () => import("./words/countries-100.js"),
  elements: () => import("./words/elements-100.js"),
  "elements-10": () => import("./words/elements-10.js"),
  "elements-20": () => import("./words/elements-20.js"),
  "elements-30": () => import("./words/elements-30.js"),
  "elements-50": () => import("./words/elements-50.js"),
  "elements-100": () => import("./words/elements-100.js"),
  emotions: () => import("./words/emotions-100.js"),
  "emotions-10": () => import("./words/emotions-10.js"),
  "emotions-20": () => import("./words/emotions-20.js"),
  "emotions-30": () => import("./words/emotions-30.js"),
  "emotions-50": () => import("./words/emotions-50.js"),
  "emotions-100": () => import("./words/emotions-100.js"),
  food: () => import("./words/food-100.js"),
  "food-10": () => import("./words/food-10.js"),
  "food-20": () => import("./words/food-20.js"),
  "food-30": () => import("./words/food-30.js"),
  "food-50": () => import("./words/food-50.js"),
  "food-100": () => import("./words/food-100.js"),
  gems: () => import("./words/gems-100.js"),
  "gems-10": () => import("./words/gems-10.js"),
  "gems-20": () => import("./words/gems-20.js"),
  "gems-30": () => import("./words/gems-30.js"),
  "gems-50": () => import("./words/gems-50.js"),
  "gems-100": () => import("./words/gems-100.js"),
  nature: () => import("./words/nature-100.js"),
  "nature-10": () => import("./words/nature-10.js"),
  "nature-20": () => import("./words/nature-20.js"),
  "nature-30": () => import("./words/nature-30.js"),
  "nature-50": () => import("./words/nature-50.js"),
  "nature-100": () => import("./words/nature-100.js"),
  snacks: () => import("./words/snacks-100.js"),
  "snacks-10": () => import("./words/snacks-10.js"),
  "snacks-20": () => import("./words/snacks-20.js"),
  "snacks-30": () => import("./words/snacks-30.js"),
  "snacks-50": () => import("./words/snacks-50.js"),
  "snacks-100": () => import("./words/snacks-100.js"),
};

type ThemeName = keyof typeof themes;

// Parse command line arguments
const args = process.argv.slice(2);

// Simple argument parsing
let theme: ThemeName | "default" = "default";
let inputNumber: number | undefined;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (!arg) continue;

  if (arg === "--help" || arg === "-h") {
    showHelp();
    process.exit(0);
  } else if (arg === "--version" || arg === "-v") {
    console.log("0.0.1");
    process.exit(0);
  } else if (arg === "--theme" || arg === "-t") {
    const nextArg = args[i + 1];
    if (nextArg && nextArg in themes) {
      theme = nextArg as ThemeName;
      i++; // Skip next argument
    } else {
      console.error(`Error: Invalid theme "${nextArg}"`);
      console.error(`Available themes: ${Object.keys(themes).join(", ")}`);
      process.exit(1);
    }
  } else if (!arg.startsWith("-")) {
    const num = parseInt(arg, 10);
    if (!isNaN(num)) {
      inputNumber = num;
    }
  }
}

/**
 * Display help information for the CLI
 */
function showHelp(): void {
  console.log(`
codenames - Convert numbers to human-readable codenames

Usage:
  codenames <number> [options]
  codenames --help

Options:
  -t, --theme <name>  Theme to use (default: cities-20)
  -h, --help         Show this help message
  -v, --version      Show version

Available themes:
  ${Object.keys(themes).join(", ")}

Examples:
  codenames 1234
  codenames 1234 --theme animals-50
  codenames 42 -t colors-10
`);
}

/**
 * Main CLI logic - processes arguments and generates codename
 */
async function main(): Promise<void> {
  if (inputNumber === undefined) {
    console.error("Error: Please provide a number to convert");
    showHelp();
    process.exit(1);
  }

  try {
    let result: string;

    if (theme === "default") {
      // Use the main export with default cities-20
      const mainModule = await import("./index.js");
      result = mainModule.default(inputNumber);
    } else {
      // Use specific theme
      const themeModule = await themes[theme]();
      const codename = themeModule.default;
      result = codename(inputNumber);
    }

    console.log(result);
  } catch (error) {
    console.error(
      `Error: ${error instanceof Error ? error.message : String(error)}`,
    );
    process.exit(1);
  }
}

// Run the CLI
main().catch((err) => {
  console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
