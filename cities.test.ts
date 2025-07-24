/* SPDX-FileCopyrightText: 2025-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { describe, expect, test } from "bun:test";
import cityCodename, { cities, codename, type City } from "./words/cities-20";

describe("cities-20 theme", () => {
  describe("structure validation", () => {
    test("has correct array length", () => {
      expect(cities.length).toBe(20);
    });

    test("has correct first and last cities", () => {
      expect(cities[0]).toBe("paris");
      expect(cities[19]).toBe("geneva");
    });

    test("all entries are lowercase strings", () => {
      cities.forEach((city) => {
        expect(typeof city).toBe("string");
        expect(city).toBe(city.toLowerCase());
      });
    });
  });

  describe("codename function", () => {
    test("exports default codename function", () => {
      const result = cityCodename(1234);
      expect(cities).toContain(result);
    });

    test("exports named codename function", () => {
      const result = codename(1234);
      expect(cities).toContain(result);
      expect(result).toBe(cityCodename(1234));
    });

    test("returns consistent results", () => {
      expect(cityCodename(1)).toBe(cityCodename(1));
      expect(codename(1)).toBe(codename(1));
      expect(cityCodename(1234)).toBe(cityCodename(1234));
      expect(codename(1234)).toBe(codename(1234));
      expect(cityCodename(-42)).toBe(cityCodename(-42));
      expect(codename(-42)).toBe(codename(-42));
    });

    test("TypeScript types work correctly", () => {
      const city: City = cityCodename(123);
      expect(cities).toContain(city);

      const typedResult: City = codename(1234);
      expect(typedResult).toBe(cityCodename(1234));
    });

    test("works as factory-created codename function", () => {
      expect(typeof cityCodename).toBe("function");
      expect(typeof codename).toBe("function");
      const result = cityCodename(1234);
      expect(cities).toContain(result);
    });

    test("handles various inputs", () => {
      expect(cities).toContain(cityCodename(0));
      expect(cities).toContain(codename(0));
      expect(cities).toContain(cityCodename(-1));
      expect(cities).toContain(codename(-1));
      expect(cities).toContain(cityCodename(999999));
      expect(cities).toContain(codename(999999));
      expect(cities).toContain(cityCodename(Number.MAX_SAFE_INTEGER));
      expect(cities).toContain(codename(Number.MAX_SAFE_INTEGER));
    });

    test("throws on invalid inputs", () => {
      expect(() => cityCodename(NaN)).toThrow();
      expect(() => codename(NaN)).toThrow();
      expect(() => cityCodename(Infinity)).toThrow();
      expect(() => codename(Infinity)).toThrow();
      expect(() => cityCodename(-Infinity)).toThrow();
      expect(() => codename(-Infinity)).toThrow();
    });
  });
});
