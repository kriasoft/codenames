import { describe, expect, test } from "bun:test";
import { codename } from "./index";

describe("codename (core with custom words)", () => {
  const testWords = ["alpha", "beta", "gamma", "delta", "epsilon"];

  test("converts numbers consistently", () => {
    const result1 = codename(1234, testWords);
    const result2 = codename(1234, testWords);
    expect(result1).toBe(result2);
  });

  test("returns different names for different numbers", () => {
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      results.add(codename(i, testWords));
    }
    expect(results.size).toBeGreaterThan(1);
  });

  test("handles negative numbers", () => {
    const result = codename(-42, testWords);
    expect(testWords).toContain(result);
  });

  test("handles very large numbers", () => {
    const result = codename(Number.MAX_SAFE_INTEGER, testWords);
    expect(testWords).toContain(result);
  });

  test("handles decimal numbers", () => {
    const result = codename(3.14159, testWords);
    expect(testWords).toContain(result);
  });

  test("throws error for non-finite numbers", () => {
    expect(() => codename(NaN, testWords)).toThrow(
      "Invalid input: expected a finite number, got NaN",
    );
    expect(() => codename(Infinity, testWords)).toThrow(
      "Invalid input: expected a finite number, got Infinity",
    );
    expect(() => codename(-Infinity, testWords)).toThrow(
      "Invalid input: expected a finite number, got -Infinity",
    );
  });

  test("throws error for empty word list", () => {
    expect(() => codename(123, [])).toThrow("Word list cannot be empty");
  });

  test("distributes values evenly across word list", () => {
    const distribution: Record<string, number> = {};
    const iterations = 10000;

    for (let i = 0; i < iterations; i++) {
      const result = codename(i, testWords);
      distribution[result] = (distribution[result] || 0) + 1;
    }

    const expectedCount = iterations / testWords.length;
    const tolerance = expectedCount * 0.2;

    for (const word of testWords) {
      expect(distribution[word]).toBeGreaterThan(expectedCount - tolerance);
      expect(distribution[word]).toBeLessThan(expectedCount + tolerance);
    }
  });
});
