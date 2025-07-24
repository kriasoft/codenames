import { describe, expect, test } from "bun:test";
import { codename, themes, type Theme } from "./all";

describe("words/all.ts exports", () => {
  test("themes array contains all expected themes", () => {
    expect(themes).toBeInstanceOf(Array);
    expect(themes.length).toBeGreaterThan(0);

    // Should contain themes for all main categories
    const categories = [
      "adjectives",
      "animals",
      "cities",
      "clothing",
      "colors",
      "countries",
      "elements",
      "emotions",
      "food",
      "gems",
      "nature",
      "snacks",
    ];
    const limits = ["10", "20", "30", "50", "100"];

    for (const category of categories) {
      for (const limit of limits) {
        const themeName = `${category}-${limit}` as Theme;
        expect(themes).toContain(themeName);
      }
    }
  });

  test("themes array has correct length", () => {
    // 12 categories × 5 limits = 60 themes
    expect(themes.length).toBe(60);
  });

  test("all themes in array are unique", () => {
    const uniqueThemes = new Set(themes);
    expect(uniqueThemes.size).toBe(themes.length);
  });

  test("codename function works with cities themes", () => {
    const result10 = codename(123, "cities-10");
    const result20 = codename(123, "cities-20");
    const result30 = codename(123, "cities-30");
    const result50 = codename(123, "cities-50");
    const result100 = codename(123, "cities-100");

    expect(typeof result10).toBe("string");
    expect(typeof result20).toBe("string");
    expect(typeof result30).toBe("string");
    expect(typeof result50).toBe("string");
    expect(typeof result100).toBe("string");

    expect(result10.length).toBeGreaterThan(0);
    expect(result20.length).toBeGreaterThan(0);
    expect(result30.length).toBeGreaterThan(0);
    expect(result50.length).toBeGreaterThan(0);
    expect(result100.length).toBeGreaterThan(0);
  });

  test("codename function works with animals themes", () => {
    const result10 = codename(456, "animals-10");
    const result20 = codename(456, "animals-20");
    const result30 = codename(456, "animals-30");
    const result50 = codename(456, "animals-50");
    const result100 = codename(456, "animals-100");

    expect(typeof result10).toBe("string");
    expect(typeof result20).toBe("string");
    expect(typeof result30).toBe("string");
    expect(typeof result50).toBe("string");
    expect(typeof result100).toBe("string");
  });

  test("codename function works with all theme categories", () => {
    const testCategories = [
      "adjectives",
      "animals",
      "cities",
      "clothing",
      "colors",
      "countries",
      "elements",
      "emotions",
      "food",
      "gems",
      "nature",
      "snacks",
    ];

    for (const category of testCategories) {
      const themeName = `${category}-20` as Theme;
      const result = codename(789, themeName);
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    }
  });

  test("codename function produces consistent results", () => {
    const testNumber = 1234;
    const theme: Theme = "colors-20";

    const result1 = codename(testNumber, theme);
    const result2 = codename(testNumber, theme);
    const result3 = codename(testNumber, theme);

    expect(result1).toBe(result2);
    expect(result2).toBe(result3);
  });

  test("codename function produces different results for different inputs", () => {
    const theme: Theme = "nature-30";

    const result1 = codename(100, theme);
    const result2 = codename(200, theme);
    const result3 = codename(300, theme);

    // While not guaranteed, it's very likely these will be different
    const allSame = result1 === result2 && result2 === result3;
    expect(allSame).toBe(false);
  });

  test("codename function handles edge cases", () => {
    const theme: Theme = "food-10";

    expect(() => codename(0, theme)).not.toThrow();
    expect(() => codename(1, theme)).not.toThrow();
    expect(() => codename(999999, theme)).not.toThrow();

    const result0 = codename(0, theme);
    const result1 = codename(1, theme);
    const resultLarge = codename(999999, theme);

    expect(typeof result0).toBe("string");
    expect(typeof result1).toBe("string");
    expect(typeof resultLarge).toBe("string");
  });

  test("codename function throws error for invalid theme", () => {
    expect(() => {
      // @ts-expect-error - Testing invalid theme
      codename(123, "invalid-theme");
    }).toThrow();

    expect(() => {
      // @ts-expect-error - Testing invalid theme
      codename(123, "cities-5");
    }).toThrow();

    expect(() => {
      // @ts-expect-error - Testing invalid theme
      codename(123, "nonexistent-20");
    }).toThrow();
  });

  test("error message includes available themes", () => {
    try {
      // @ts-expect-error - Testing invalid theme
      codename(123, "invalid-theme");
      expect(true).toBe(false); // Should not reach here
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      const message = (error as Error).message;
      expect(message).toContain("Unknown theme");
      expect(message).toContain("Available themes");
      expect(message).toContain("cities-20");
      expect(message).toContain("animals-10");
    }
  });

  test("Theme type includes all expected theme names", () => {
    // This is a compile-time check, but we can verify at runtime too
    const sampleThemes: Theme[] = [
      "cities-20",
      "animals-10",
      "colors-50",
      "food-100",
      "nature-30",
    ];

    for (const theme of sampleThemes) {
      expect(themes).toContain(theme);
      expect(() => codename(123, theme)).not.toThrow();
    }
  });

  test("different theme sizes produce valid results", () => {
    const testNumber = 555;

    const result10 = codename(testNumber, "gems-10");
    const result20 = codename(testNumber, "gems-20");
    const result30 = codename(testNumber, "gems-30");
    const result50 = codename(testNumber, "gems-50");
    const result100 = codename(testNumber, "gems-100");

    expect(typeof result10).toBe("string");
    expect(typeof result20).toBe("string");
    expect(typeof result30).toBe("string");
    expect(typeof result50).toBe("string");
    expect(typeof result100).toBe("string");

    // All should be valid gem names (lowercase strings)
    expect(result10).toMatch(/^[a-z]+$/);
    expect(result20).toMatch(/^[a-z]+$/);
    expect(result30).toMatch(/^[a-z]+$/);
    expect(result50).toMatch(/^[a-z]+$/);
    expect(result100).toMatch(/^[a-z]+$/);
  });

  test("integration with existing theme files", () => {
    // Import a specific theme to compare
    import("./cities-20.js").then((citiesModule) => {
      const testNumber = 888;
      const citiesResult = citiesModule.default(testNumber);
      const allResult = codename(testNumber, "cities-20");

      expect(allResult).toBe(citiesResult);
    });
  });

  test("themes array is properly typed as readonly", () => {
    // TypeScript compile-time check - the array should be typed as readonly
    // This test verifies the themes array exists and has the expected structure
    expect(Array.isArray(themes)).toBe(true);
    expect(themes.length).toBe(60);

    // Verify all items are strings matching the expected pattern
    for (const theme of themes) {
      expect(typeof theme).toBe("string");
      expect(theme).toMatch(/^[a-z]+-\d+$/);
    }

    // Note: TypeScript provides compile-time readonly protection,
    // but JavaScript arrays are mutable at runtime by design
  });
});
