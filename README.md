# Codenames

[![npm version](https://badge.fury.io/js/codenames.svg)](https://badge.fury.io/js/codenames)
[![npm downloads](https://img.shields.io/npm/dm/codenames.svg)](https://www.npmjs.com/package/codenames)
[![bundle size](https://img.shields.io/bundlephobia/minzip/codenames)](https://bundlephobia.com/package/codenames)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight TypeScript library that converts any number into consistent, memorable codename from a curated word list. It's designed for use cases where human-readability is more important than collision resistance, such as generating preview URLs or readable test IDs.

```typescript
// Default: uses the cities-20 word list
import codename from "codenames";

codename(1234); // "london"
codename(1234); // "london" (always the same)
codename(5678); // "paris"
codename(6789); // "berlin"

// With custom words
codename(1234, ["one", "two", "three"]); // "two"
```

## Features

- **🎯 Deterministic** - Same input always produces the same codename
- **💬 Human-Readable** - Memorable names instead of random strings
- **🚀 Zero Dependencies** - Lightweight and fast with no external packages
- **⚡ Fast & Tiny** - 50,000+ generations per second, <3KB core + ~2KB per theme
- **🌐 Universal Runtime** - Works in Node.js, Bun, Deno, browsers, and edge runtimes
- **🎨 Multiple Themes** - Cities, animals, colors, space, and more built-in themes
- **🤖 CLI Included** - Generate codenames directly from your terminal

## Use Cases

### Preview Deployments

Managing preview environments can get messy. You end up tracking which PR is deployed where, maintaining state, dealing with conflicts. Here's a simpler approach: use deterministic hashing to map PR numbers to memorable names.

```typescript
import codename from "codenames/cities-20";

// PR #1234 always maps to the same URL
const previewUrl = `https://${codename(1234)}.example.com`;
// => https://london.example.com

// PR #5678 gets a different one
const anotherUrl = `https://${codename(5678)}.example.com`;
// => https://paris.example.com
```

With 20 city names, you get 20 deployment slots. No database needed. The same PR number always produces the same city name, so URLs stay consistent throughout the PR lifecycle.

Plus, it's easier to share "london.example.com" in Slack than "preview-env-1234.k8s.us-east-1.example.com".

### Other Uses

- **Docker Containers**: `docker run --name "app-${codename(buildId)}" myapp` → `app-tokyo`
- **Session IDs**: `vienna-support` is friendlier than `sess_kJ8Hg2Bx9`
- **Feature Flags**: `berlin-experiment` instead of `experiment_42`
- **Test Data**: Generate predictable usernames (`cat`, `dog`, `bird`)

## Getting Started

```bash
npm install codenames
```

```typescript
// Default: uses cities-20 word list
import codename from "codenames";
// OR
import { codename } from "codenames";

const name = codename(1234); // "london"
```

### Using Different Themes

You can import specific themed word lists:

```typescript
// Import from a specific theme
import codename from "codenames/animals-20";
// OR
import { codename } from "codenames/animals-20";

const name = codename(1234); // "cat"
```

### Using Custom Word Lists

For maximum flexibility, use the core function with your own words:

```typescript
// Use your own custom word list
import { codename } from "codenames/core";

const name = codename(1234, ["alpha", "beta", "gamma"]); // "beta"
```

## API Reference

### Default API (with cities-20)

```typescript
import codename from "codenames";             // default export
import { codename } from "codenames";         // named export

codename(input: number, words?: readonly string[]): string
```

- `input` - The number to convert
- `words` - Optional array of words to use (defaults to cities-20)

### Core API (with custom words)

```typescript
import codename from "codenames/core";        // default export
import { codename } from "codenames/core";    // named export

codename(input: number, words: readonly string[]): string
```

- `input` - The number to convert
- `words` - Required array of words to use

### Themed APIs

```typescript
import codename from "codenames/cities-20";   // default export
import { codename } from "codenames/animals-50"; // named export
// ... and many more

codename(input: number): string
```

All APIs support the same input types:

- Positive integers: `123`, `1234`
- Negative integers: `-42`
- Decimals: `3.14` (converted to integers internally)
- Large numbers: up to `Number.MAX_SAFE_INTEGER`

Supported list sizes are 10, 20, 30, 50, and 100. The default theme uses 20 words.

## Command Line Interface

Generate codenames directly from your terminal without writing any code.

### Quick Start

```bash
# Generate a codename using the default cities-20 theme
npx codenames 1234
# => london

# Use the short alias
npx cn 1234
# => london
```

### Installation (Optional)

For frequent use, install globally:

```bash
npm install -g codenames
# Now you can use it without npx
codenames 1234
```

### Options

```bash
# Choose a different theme
codenames 1234 --theme animals-50
# => cat

# Use short flag
codenames 1234 -t colors-10
# => blue

# Show help
codenames --help

# Show version
codenames --version
```

### Examples

```bash
# Generate deployment URLs
echo "Preview: https://$(codenames $PR_NUMBER).preview.example.com"
# => Preview: https://london.preview.example.com

# Name Docker containers
docker run --name "app-$(codenames $BUILD_ID)" myapp:latest

# Create test data
for i in {1..5}; do
  echo "User: $(codenames $i -t animals-20)"
done
# => User: cat
# => User: dog
# => User: bird
# => User: fish
# => User: cow
```

## Word Lists

Each theme is available in multiple sizes: 10, 20, 30, 50, and 100 words. Choose based on your collision tolerance needs.

- **[Adjectives](words/adjectives.txt)**: good, bad, big, small, new, old, hot, cold, fast, slow, ...
- **[Animals](words/animals.txt)**: cat, dog, fish, bird, cow, pig, bee, ant, bat, fly, ...
- **[Cities](words/cities.txt)**: paris, london, rome, tokyo, berlin, madrid, sydney, moscow, cairo, dubai, ...
- **[Clothing](words/clothing.txt)**: shirt, jeans, shoe, hat, sock, dress, coat, belt, tie, pants, ...
- **[Colors](words/colors.txt)**: red, blue, green, yellow, black, white, gray, pink, orange, purple, ...
- **[Countries](words/countries.txt)**: china, japan, india, france, italy, spain, canada, mexico, brazil, germany, ...
- **[Elements](words/elements.txt)**: gold, iron, lead, zinc, tin, copper, silver, carbon, oxygen, helium, ...
- **[Emotions](words/emotions.txt)**: love, hate, joy, sad, fear, mad, happy, angry, glad, calm, ...
- **[Food](words/food.txt)**: bread, milk, egg, rice, meat, fish, cake, apple, cheese, pasta, ...
- **[Gems](words/gems.txt)**: ruby, pearl, jade, opal, amber, diamond, emerald, gold, silver, topaz, ...
- **[Nature](words/nature.txt)**: tree, sun, sky, rain, moon, star, wind, sea, water, rock, ...
- **[Snacks](words/snacks.txt)**: chips, nuts, cookie, pretzel, popcorn, candy, fruit, cheese, cracker, yogurt, ...

## Contributing

We welcome contributions! Here's how to get started:

### Development Setup

```bash
git clone https://github.com/your-username/codenames.git
cd codenames
bun install
```

### Running Tests

```bash
bun test
```

### Building

```bash
bun run build
```

### Adding New Themes

Run [`/generate-words <name>`](./.claude/commands/generate-words.md) AI prompt in Claude Code or a similar tool.

### Pull Request Guidelines

- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

## Related Projects

- **[React Starter Kit](https://github.com/kriasoft/react-starter-kit)** — Modern React starter kit with Bun, TypeScript, tRPC, and Cloudflare Workers.

## Backers 💰

<a href="https://reactstarter.com/b/1"><img src="https://reactstarter.com/b/1.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/2"><img src="https://reactstarter.com/b/2.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/3"><img src="https://reactstarter.com/b/3.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/4"><img src="https://reactstarter.com/b/4.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/5"><img src="https://reactstarter.com/b/5.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/6"><img src="https://reactstarter.com/b/6.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/7"><img src="https://reactstarter.com/b/7.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/8"><img src="https://reactstarter.com/b/8.png" height="60" /></a>

## License

MIT License - see the [LICENSE](LICENSE) file for details.
