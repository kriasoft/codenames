import { describe, expect, test } from "bun:test";
import codename from "./index";
import { cities } from "./words/cities-20";
import cityCodename from "./words/cities-20";
import { createCodename, createTypedCodename } from "./core/factory";

describe("integration tests", () => {
  test("base codename function works with city list", () => {
    const result = codename(cities, 1234);
    expect(cities).toContain(result);
  });

  test("theme-specific export works", () => {
    const result = cityCodename(1234);
    expect(cities).toContain(result);

    // Should produce same result as base function
    expect(result).toBe(codename(cities, 1234));
  });

  test("factory function creates working codename functions", () => {
    const customCodename = createCodename(["apple", "banana", "cherry"]);
    const result = customCodename(42);
    expect(["apple", "banana", "cherry"]).toContain(result);
  });

  test("typed factory preserves type information", () => {
    const words = ["red", "green", "blue"] as const;
    const colorCodename = createTypedCodename(words);
    const result = colorCodename(123);

    // TypeScript should know result is "red" | "green" | "blue"
    expect(words).toContain(result);
  });

  test("consistent results across different usage patterns", () => {
    const testNumber = 9876;

    const result1 = codename(cities, testNumber);
    const result2 = cityCodename(testNumber);
    const result3 = createCodename(cities)(testNumber);

    expect(result1).toBe(result2);
    expect(result2).toBe(result3);
  });
});
