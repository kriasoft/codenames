# Codenames

[![npm version](https://badge.fury.io/js/codenames.svg)](https://badge.fury.io/js/codenames)
[![npm downloads](https://img.shields.io/npm/dm/codenames.svg)](https://www.npmjs.com/package/codenames)
[![bundle size](https://img.shields.io/bundlephobia/minzip/codenames)](https://bundlephobia.com/package/codenames)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight TypeScript library that converts any number into consistent, memorable codename from a curated word list. It's designed for use cases where human-readability is more important than collision resistance, such as generating preview URLs or readable test IDs.

```typescript
// Codename generator using the most memorable 20 cities
import codename from "codenames/cities-20";

codename(1234); // "london", uses "cities"
codename(1234); // "london" (always the same)
codename(5678); // "paris"
codename(6789); // "berlin"
```

## Features

- **🎯 Deterministic** - Same input always produces the same codename
- **💬 Human-Readable** - Memorable names instead of random strings
- **🚀 Zero Dependencies** - Lightweight and fast with no external packages
- **⚡ Fast** - 50,000+ generations per second
- **📦 <3KB Core** - Ultra-minimal footprint, themes add ~2KB each
- **🌐 Universal Runtime** - Works in Node.js, Bun, Deno, browsers, and edge runtimes
- **🎨 Multiple Themes** - Cities, animals, colors, space, and more built-in themes
- **📦 Modern JavaScript** - TypeScript with full type safety, ESM package
- **📝 Customizable** - Create your own themes and word lists
- **🤖 CLI Included** - Generate codenames directly from your terminal

## Use Cases

- **Preview Deployments** - Generate unique URLs for pull requests
- **Container Names** - Memorable Docker container identifiers
- **Session IDs** - User-friendly session identifiers for support
- **Feature Flags** - Human-friendly names for A/B tests
- **Test Environments** - Readable identifiers for testing pipelines
- **Test Data Generation** - Consistent test data generation

## Getting Started

```bash
npm install codenames
```

```typescript
// Import the codename generator using the top 20
// words from the curated list of world cities
import codename from "codenames/cities-20";

// Get a codename for the number 1234
const name = codename(1234); // "london"
```

You can use different word lists and list sizes by importing the appropriate module:

```typescript
import codename from "codenames/colors-50";

const name = codename(1234); // "blue"
```

Supported list sizes are 10, 20, 30, 50, and 100. The default is 20.

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

- **Adjectives**: good, bad, big, small, new, old, hot, cold, fast, slow, ...
- **Animals**: cat, dog, fish, bird, cow, pig, bee, ant, bat, fly, ...
- **Cities**: paris, london, rome, tokyo, berlin, madrid, sydney, moscow, cairo, dubai, ...
- **Clothing**: shirt, jeans, shoe, hat, sock, dress, coat, belt, tie, pants, ...
- **Colors**: red, blue, green, yellow, black, white, gray, pink, orange, purple, ...
- **Countries**: china, japan, india, france, italy, spain, canada, mexico, brazil, germany, ...
- **Elements**: gold, iron, lead, zinc, tin, copper, silver, carbon, oxygen, helium, ...
- **Emotions**: love, hate, joy, sad, fear, mad, happy, angry, glad, calm, ...
- **Food**: bread, milk, egg, rice, meat, fish, cake, apple, cheese, pasta, ...
- **Gems**: ruby, pearl, jade, opal, amber, diamond, emerald, gold, silver, topaz, ...
- **Nature**: tree, sun, sky, rain, moon, star, wind, sea, water, rock, ...
- **Snacks**: chips, nuts, cookie, pretzel, popcorn, candy, fruit, cheese, cracker, yogurt, ...

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
