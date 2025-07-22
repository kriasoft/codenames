Your task is to generate a curated list of exactly 100 words for a given theme or category.

**Theme or Category:** $ARGUMENTS

Load existing list from `words/<list>.txt` file, if it exists to see if you can improve this list by adding, removing, or re-ordering items (just small incremental updates). If the file does not exist, create a new one.

Follow these rules strictly:

**1. Word Constraints:**

- **Length:** Every word must be 7 characters long or shorter (i.e., less than 8 characters).
- **Simplicity:** Use only single, non-compound words. For example, for the theme 'weather', use 'rain' and 'snow', but not 'thunderstorm'.
- **Purity:** Do not include abbreviations, acronyms, slang, or proper nouns (like brands, 'USA', 'UK', etc.).

**2. List Ordering:**
The list must be sorted by the following criteria, in this specific order of priority:

- **Primary Criterion - Memorability (Weight: 0.5):** Place the most common, fundamental, and evocative words first. These should be high-frequency words that are strongly associated with the theme and easy to recall.
- **Secondary Criterion - Shortness (Weight: 0.3):** When words have a similar level of memorability, the shorter word must come first.
- **Tertiary Criterion - Easy to Spell (Weight 0.2):** If two words are equally memorable and of the same length, the one that is easier to spell should come first.

Please generate only the final, numbered list of 100 words.

Save it to `words/<list>.txt` file, one word per line without any additional formatting or prefixes.

Run `bun prettier --write words/<list>.txt` to format the file after generating the list.
