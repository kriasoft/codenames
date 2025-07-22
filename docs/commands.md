# Codenames CLI Commands

Codenames provides a command-line interface for converting numbers to human-readable names and other related operations.

## Installation

```bash
npm install -g codenames
```

## Basic Usage

```bash
codenames <number>
```

Converts a number to a codename using the default theme (cities).

**Example:**

```bash
$ codenames 1234
cairo
```

## Commands

### `codenames <number>`

Convert a number to a codename.

**Options:**

- `--format <format>` - Output format: `plain` (default) or `json`
- `--theme <theme>` - Theme to use (default: `cities`)

**Examples:**

```bash
$ codenames 42
berlin

$ codenames 42 --format json
"berlin"
```

### `codenames list`

List all available codenames in the current theme.

**Options:**

- `--theme <theme>` - Theme to use (default: `cities`)
- `--format <format>` - Output format: `plain` (default) or `json`

**Examples:**

```bash
$ codenames list
london
paris
tokyo
sydney
berlin
dubai
rome
delhi
cairo
moscow

$ codenames list --format json
["london", "paris", "tokyo", "sydney", "berlin", "dubai", "rome", "delhi", "cairo", "moscow"]
```

### `codenames themes`

List all available themes.

**Options:**

- `--format <format>` - Output format: `plain` (default) or `json`

**Examples:**

```bash
$ codenames themes
cities
```

### `codenames generate <start> <end>`

Generate codenames for a range of numbers.

**Options:**

- `--format <format>` - Output format: `plain` (default) or `json`
- `--theme <theme>` - Theme to use (default: `cities`)

**Examples:**

```bash
$ codenames generate 1 5
1 -> moscow
2 -> london
3 -> paris
4 -> rome
5 -> cairo

$ codenames generate 1 3 --format json
[
  {"number": 1, "name": "moscow"},
  {"number": 2, "name": "london"},
  {"number": 3, "name": "paris"}
]
```

### `codenames reverse <name>`

Find numbers that map to a specific codename (searches first 100,000 numbers by default).

**Options:**

- `--format <format>` - Output format: `plain` (default) or `json`
- `--theme <theme>` - Theme to use (default: `cities`)

**Examples:**

```bash
$ codenames reverse london
2
29
152
301
...

$ codenames reverse paris --format json
[3, 52, 173, 287, ...]
```

### `codenames url <number> --domain <domain>`

Generate a preview URL using the codename.

**Options:**

- `--domain <domain>` - Domain to use for the URL (required)
- `--format <format>` - Output format: `plain` (default) or `json`
- `--theme <theme>` - Theme to use (default: `cities`)

**Examples:**

```bash
$ codenames url 1234 --domain example.com
https://cairo.example.com

$ codenames url 42 --domain staging.myapp.io
https://berlin.staging.myapp.io
```

## Global Options

### `--help, -h`

Show help message.

```bash
$ codenames --help
```

### `--version, -v`

Show version information.

```bash
$ codenames --version
```

## GitHub Actions Integration

When running in GitHub Actions, you can use the `GITHUB_OUTPUT` environment variable to write output in the correct format:

```yaml
- name: Get PR codename
  run: |
    codenames ${{ github.event.pull_request.number }}
```

This will write:

```
prNumber=1234
prName=cairo
```

## Programmatic Usage

You can also use codenames as a library in your Node.js projects:

```javascript
const Codenames = require("codenames");

// Create instance with default theme
const codenames = new Codenames();

// Convert number to name
const name = codenames.encode(1234); // 'cairo'

// Use different theme (when available)
const customCodenames = new Codenames({ theme: "cities" });

// Generate range
const range = codenames.generateRange(1, 10);

// Find reverse mappings
const numbers = codenames.reverse("london", 10);

// Generate URL
const url = codenames.generateUrl(1234, "example.com");
```

## Themes

Currently available themes:

- `cities` - Major world cities (default)

More themes can be added in future versions.
