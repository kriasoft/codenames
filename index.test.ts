/* SPDX-FileCopyrightText: 2025-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { describe, expect, test } from "bun:test";
import defaultCodename, { codename } from "./index";

describe("codename (default export)", () => {
  test("converts numbers consistently", () => {
    const result1 = defaultCodename(1234);
    const result2 = defaultCodename(1234);
    expect(result1).toBe(result2);
  });

  test("returns different names for different numbers", () => {
    const results = new Set();
    for (let i = 0; i < 100; i++) {
      results.add(defaultCodename(i));
    }
    expect(results.size).toBeGreaterThan(1);
  });

  test("handles negative numbers", () => {
    const result = defaultCodename(-42);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  test("handles very large numbers", () => {
    const result = defaultCodename(Number.MAX_SAFE_INTEGER);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  test("handles decimal numbers", () => {
    const result = defaultCodename(3.14159);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  test("throws error for non-finite numbers", () => {
    expect(() => defaultCodename(NaN)).toThrow(
      "Invalid input: expected a finite number, got NaN",
    );
    expect(() => defaultCodename(Infinity)).toThrow(
      "Invalid input: expected a finite number, got Infinity",
    );
    expect(() => defaultCodename(-Infinity)).toThrow(
      "Invalid input: expected a finite number, got -Infinity",
    );
  });

  test("returns city names by default", () => {
    const result = defaultCodename(123);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  test("accepts custom words", () => {
    const testWords = ["alpha", "beta", "gamma", "delta", "epsilon"];
    const result = defaultCodename(123, testWords);
    expect(testWords).toContain(result);
  });
});

describe("codename (named export)", () => {
  test("converts numbers consistently with default cities", () => {
    const result1 = codename(1234);
    const result2 = codename(1234);
    expect(result1).toBe(result2);
  });

  test("default export and named export return same result", () => {
    const result1 = defaultCodename(1234);
    const result2 = codename(1234);
    expect(result1).toBe(result2);
  });

  const testWords = ["alpha", "beta", "gamma", "delta", "epsilon"];

  test("converts numbers consistently with custom words", () => {
    const result1 = codename(1234, testWords);
    const result2 = codename(1234, testWords);
    expect(result1).toBe(result2);
  });

  test("returns words from custom list", () => {
    const result = codename(123, testWords);
    expect(testWords).toContain(result);
  });

  test("handles negative numbers with custom words", () => {
    const result = codename(-42, testWords);
    expect(testWords).toContain(result);
  });

  test("throws error for empty word list", () => {
    expect(() => codename(123, [])).toThrow("Word list cannot be empty");
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
});
