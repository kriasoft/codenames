import { describe, expect, test } from "bun:test";
import codename, { codename as codenameWithWords } from "./index";
import { codename as coreCodename } from "./core/index";
import { cities } from "./words/cities-20";
import cityCodename from "./words/cities-20";
import { createCodename, createTypedCodename } from "./core/factory";
import { codename as allCodename, themes } from "./words/all";

describe("integration tests", () => {
  test("default codename function works with cities-20", () => {
    const result = codename(1234);
    expect(cities).toContain(result);
  });

  test("named codename function works with custom word list", () => {
    const result = codenameWithWords(1234, cities);
    expect(cities).toContain(result);
  });

  test("core codename function works with custom word list", () => {
    const result = coreCodename(1234, cities);
    expect(cities).toContain(result);
  });

  test("theme-specific export works", () => {
    const result = cityCodename(1234);
    expect(cities).toContain(result);

    // Should produce same result as default function
    expect(result).toBe(codename(1234));
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

    const result1 = codename(testNumber); // default with cities-20
    const result2 = cityCodename(testNumber); // cities-20 specific
    const result3 = codenameWithWords(testNumber, cities); // named export with cities
    const result4 = coreCodename(testNumber, cities); // core with cities
    const result5 = createCodename(cities)(testNumber); // factory

    expect(result1).toBe(result2);
    expect(result2).toBe(result3);
    expect(result3).toBe(result4);
    expect(result4).toBe(result5);
  });

  test("all APIs use same underlying implementation", () => {
    const testNumber = 42;

    const defaultResult = codename(testNumber);
    const namedResult = codenameWithWords(testNumber, cities);
    const coreResult = coreCodename(testNumber, cities);
    const themeResult = cityCodename(testNumber);

    expect(defaultResult).toBe(namedResult);
    expect(namedResult).toBe(coreResult);
    expect(coreResult).toBe(themeResult);
  });

  test("all.ts export produces consistent results with individual theme files", () => {
    const testNumber = 1234;

    // Compare cities-20 from individual file vs all.ts
    const cityResult = cityCodename(testNumber);
    const allCityResult = allCodename(testNumber, "cities-20");
    expect(allCityResult).toBe(cityResult);

    // Compare with default export (which uses cities-20)
    const defaultResult = codename(testNumber);
    expect(allCityResult).toBe(defaultResult);
  });

  test("all.ts themes array includes all expected themes", () => {
    expect(themes).toContain("cities-20");
    expect(themes).toContain("animals-10");
    expect(themes).toContain("colors-50");
    expect(themes.length).toBe(60); // 12 categories × 5 sizes
  });
});
