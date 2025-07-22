- [ ] Get the list of word categories (themes) in the `words` directory where each category has a corresponding `words/<list>.txt` file.

- [ ] For each category, run the command to generate the export files:

```bash
bun run ./scripts/generate.ts <list> <ClassName>
```

Where `<list>` is the name of the words list (e.g., `cities`, `animals`) and `<ClassName>` is the name of the class representing each item in the list (e.g., `City`, `Animal`, etc.).

- [ ] Update `exports` in `package.json` to ensure that it contains all the word lists with the default export for each category pointing to `<list>-20.ts` (default) file. These exports need to support Bun, Deno, TypeScript, types, and ESM.

- [ ] Update the list of themes in `cli.ts`; use `./words/<list>-100.js` as the default theme for each category.

- [ ] Update the "Word Lists" section in `README.md` to ensure that the list of categories and the top 10 words for each category are accurate and up-to-date.

- [ ] Format the generated files using Prettier:

```bash
bun prettier --write .
```
