# Codenames Library Development Guide

`codenames` is a library that converts any numerical value into a human-readable name following a specific theme (e.g. cities).

```
1 -> "moscow"
2 -> "london"
3 -> "paris"
```

One of the primary use cases is to generate unique deployment URLs for preview environments:

```
PR 1234 -> https://london.example.com
```

## API Example

```typescript
import codename from "codenames/cities-20";

const name = codename(1234); // "london"
```

## Technology Stack

- **Runtime**: Bun
- **Language**: TypeScript
- **Formatter**: Prettier
- **Build**: Zero dependencies preferred
- **CLI**: Command-line interface included

## Project Structure

- `/words/` - Raw theme wordlists (.txt files)
- `/dist/` - Compiled TypeScript output
- `/scripts/` - Build and generation scripts
- `index.ts` - Main entry point
- `cli.ts` - Command-line interface
- Theme files follow pattern: `{theme}-{count}.ts` (e.g., `cities-20.ts`)

## Core Commands

- `bun install` - Install dependencies
- `bun add <name>` - Add a dependency
- `bun run build` - Build the project
- `bun run <script>` - Run a script
- `bun test` - Run tests
- `npx codenames <number>` - Generate codename from CLI

## CLI Implementation

- Use `#!/usr/bin/env node` shebang for Node.js compatibility
- Support both `codenames` and `cn` as command aliases
- Accept theme selection via flags: `--theme cities` or `-t cities`
- Support list size selection: `--size 20` or `-s 20`
- Include `--help` command with usage examples
- Return non-zero exit codes for errors
- Support piping and stdout/stderr properly

## Coding Principles

- Write lean, clear, and efficient code without over-engineering
- Prioritize readability and maintainability over cleverness
- Use descriptive variable names that clearly indicate purpose
- Keep functions small and focused on a single responsibility
- Avoid premature optimization - make it work, then make it fast if needed
- Use ES6+ features: arrow functions, destructuring, template literals, optional chaining
- NO COMMENTS unless explicitly requested by user

## Architecture & Design

- Structure code with clear separation of concerns
- Export a simple, intuitive public API
- Keep internal implementation details private
- Design for extensibility without compromising simplicity
- Use pure functions where possible for easier testing and deterministic output (same input → same output)
- Use deterministic hashing for consistent output
- Consider offering multiple wordlists or themes
- Ensure collision resistance appropriate for use case
- Provide options for output format

## Error Handling

- Throw meaningful errors for invalid inputs (NaN, Infinity, negative numbers)
- Use specific error classes when appropriate (e.g., `InvalidInputError`)
- Include helpful error messages with suggestions for resolution
- Handle edge cases: decimals, very large numbers, non-numeric inputs
- Provide graceful fallbacks where appropriate

## Wordlist/Theme Guidelines

### Theme Structure

- Each theme should have a minimum of 100 unique entries
- Raw wordlists stored as `.txt` files in `/words/` directory
- Generated TypeScript files placed in project root
- Use TypeScript const arrays with as const assertion
- Sort entries alphabetically for consistency
- Support multiple list sizes: 10, 20, 30, 50, and 100 entries
- Default list size is 20 entries
- Default theme is cities (available without configuration)
- Ensure all themes are appropriate for professional use

### Creating New Themes

1. Create a `.txt` file in `/words/` directory (e.g., `/words/mythical.txt`)
2. Add one word per line, lowercase, alphabetically sorted
3. Run `bun run scripts/generate.ts` to generate sized variants
4. Generated files will appear as `mythical-10.ts`, `mythical-20.ts`, etc.

Example generated file structure:

```typescript
// mythical-20.ts
export const words = [
  "dragon",
  "griffin",
  "phoenix",
  // ... 20 entries total
] as const;

export default function codename(input: number): string {
  // implementation
}
```

### Built-in Themes

- **Cities**: paris, london, tokyo, rome, berlin, madrid, sydney, vienna, athens, dublin
- **Animals**: cat, dog, bird, fish, cow, pig, duck, bee, fox, owl
- **Colors**: red, blue, green, yellow, black, white, gray, pink, orange, purple
- **Emotions**: love, hate, joy, sad, fear, mad, happy, angry, glad, calm
- **Food**: bread, milk, egg, rice, meat, fish, cake, apple, cheese, pasta
- **Nature**: tree, sun, sky, rain, moon, star, wind, sea, water, rock
- **Snacks**: chips, nuts, cookie, pretzel, popcorn, candy, fruit, cheese, cracker, yogurt
- **Space**: star, moon, sun, mars, venus, earth, saturn, jupiter, mercury, pluto

### Wordlist Generation Process

- Source wordlists are stored in `/words/*.txt` files
- Use `scripts/generate.ts` to create sized variants (10, 20, 30, 50, 100)
- Generated TypeScript files are placed in the project root
- Each generated file exports a default codename function
- Maintain alphabetical order in both source and generated files

### Theme Requirements

- Entries must be lowercase, alphanumeric strings
- No special characters or spaces (use hyphens if needed)
- Avoid offensive or controversial terms
- Ensure global/cultural appropriateness
- Consider internationalization (i18n)

### Collision Resistance

- For 100-entry wordlist: supports ~10,000 unique values
- For 1,000-entry wordlist: supports ~1,000,000 unique values
- Use consistent hashing algorithm (e.g., FNV-1a)
- Document collision probability in README

## NPM Package Requirements

### General Guidelines

- Include ESM builds only
- Keep dependencies minimal - prefer zero dependencies if possible
- Write comprehensive JSDoc comments for public APIs
- Include TypeScript definitions (.d.ts files)
- Target Node.js LTS versions and modern browsers

### Build & Distribution

#### Module Formats

- Use proper package.json exports field
- Include source maps for debugging

#### Package.json Configuration

```json
{
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist", "README.md", "LICENSE"],
  "sideEffects": false
}
```

#### Browser Compatibility

- Support all evergreen browsers (Chrome, Firefox, Safari, Edge)
- No usage of Node.js-specific APIs in core functionality
- Provide browser-specific build if needed
- Keep bundle size under 10KB gzipped

#### Build Process

- Use Bun's built-in bundler for optimal performance
- Generate TypeScript declarations with tsc
- Minify production builds
- Tree-shaking friendly exports

### Package Metadata

```json
{
  "name": "codenames",
  "version": "1.0.0",
  "description": "Convert numbers to human-readable codenames",
  "keywords": ["codename", "hash", "identifier", "human-readable"],
  "homepage": "https://github.com/username/codenames#readme",
  "bugs": "https://github.com/username/codenames/issues",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/username/codenames.git"
  },
  "license": "MIT",
  "author": "Your Name <email@example.com>",
  "engines": {
    "node": ">=18.0.0"
  }
}
```

## Developer Experience (DX)

- Provide clear, helpful error messages
- Include usage examples in documentation
- Design APIs that are intuitive and hard to misuse
- Support method chaining where it makes sense
- Include sensible defaults while allowing customization

## Testing Requirements

- Use Bun's built-in test runner for unit tests
- Achieve 100% code coverage for core functionality
- Write tests before implementation (TDD approach)
- Include edge cases and error scenarios
- Test all public API methods with various inputs
- Include integration tests for CLI functionality
- Add performance benchmarks for hash functions
- Test deterministic output (same input → same output)
- Validate all supported themes/wordlists

### Example Test Structure

```typescript
import { describe, expect, test } from "bun:test";
import codename from "codenames/cities-20";

describe("codenames", () => {
  test("converts numbers consistently", () => {
    expect(codename(1)).toBe("moscow");
    expect(codename(1)).toBe("moscow"); // deterministic
  });
});
```

## Documentation Standards

### README.md Requirements

- Clear project description and use cases
- Installation instructions (npm, yarn, pnpm, bun)
- Quick start example
- Comprehensive API documentation
- Theme/wordlist options
- Performance characteristics
- Badges: npm version, bundle size, test coverage, TypeScript

### API Documentation

```typescript
/**
 * Converts a number to a human-readable codename
 * @param input - The number to convert
 * @returns A string codename
 * @example
 * import codename from "codenames/cities-20";
 * codename(1234) // "london"
 */
export default function codename(input: number): string;
```

### Examples Directory

- Basic usage examples
- Theme switching
- Custom themes
- CLI usage
- Integration examples (React, Vue, etc.)

## Performance & Quality Metrics

### Performance Requirements

- Hash function execution < 1ms for any input
- Zero runtime dependencies
- Startup time < 50ms
- Memory usage < 1MB for core functionality

### Bundle Size Targets

- Core library: < 3KB gzipped
- With default theme: < 10KB gzipped
- Each additional theme: < 2KB gzipped

### Code Quality Metrics

- 100% test coverage for public API
- TypeScript strict mode enabled
- No any types in public API
- ESLint with recommended rules
- Automated code formatting

## Security Considerations

### Input Validation

- Validate number inputs (handle Infinity, NaN)
- Sanitize theme names
- Prevent prototype pollution
- Handle large numbers gracefully

### Output Safety

- Ensure all outputs are safe strings
- No execution of dynamic code
- Deterministic but not predictable for security tokens
- Document security implications in README

## Versioning & Release Process

### Semantic Versioning

- MAJOR: Breaking API changes
- MINOR: New features, backwards compatible
- PATCH: Bug fixes, performance improvements

### Release Checklist

- [ ] All tests passing
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Bundle size checked
- [ ] Performance benchmarks run
- [ ] Security audit passed
- [ ] Examples tested
- [ ] Version bumped appropriately

### NPM Publishing

- Use npm version command for version bumps
- Tag releases in git
- Publish from CI/CD pipeline
- Include provenance with --provenance flag
- Test installation in clean environment

### Pre-release Testing

- Alpha/beta releases for major changes
- Test in real projects before stable release
- Gather community feedback
- Check compatibility with major frameworks

## Code Style Configuration

### Prettier Settings

```json
{
  "singleQuote": false,
  "semi": true,
  "trailingComma": "all",
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 80
}
```

## Implementation Checklist

When implementing features, follow this order:

1. **Design API** - Create TypeScript interfaces and JSDoc
2. **Write Tests** - TDD approach with comprehensive coverage
3. **Implement Core** - Pure functions with deterministic output
4. **Add Themes** - Start with default theme
5. **Create CLI** - Optional command-line interface
6. **Documentation** - README, examples, API docs
7. **Performance** - Benchmark and optimize
8. **Security** - Audit inputs and outputs
9. **Build Setup** - ESM package
10. **Release** - Follow semantic versioning
