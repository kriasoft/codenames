#!/usr/bin/env bun

/**
 * Test script to compare hash distribution between simpleHash and fnv1a algorithms
 *
 * SPDX-FileCopyrightText: 2025-present Kriasoft
 * SPDX-License-Identifier: MIT
 */

// Simple hash implementation from proposal.js
function simpleHash(seed: number): number {
  seed = seed ^ 0x3ade68b1;
  seed = seed ^ (seed >>> 15) ^ (seed << 13);
  seed = seed ^ (seed >>> 17);
  return seed;
}

// Simple hash with multiple iterations as in proposal.js
function simpleHashMultiple(prNumber: number): number {
  let hashValue = simpleHash(prNumber);
  for (let i = 0; i < 5; i++) {
    hashValue = simpleHash(hashValue);
  }
  return hashValue;
}

// FNV-1a implementation from index.ts
function fnv1a(input: number): number {
  const FNV_PRIME = 0x01000193;
  const FNV_OFFSET_BASIS = 0x811c9dc5;

  let hash = FNV_OFFSET_BASIS;
  const bytes = numberToBytes(input);

  for (const byte of bytes) {
    hash ^= byte;
    hash = Math.imul(hash, FNV_PRIME);
  }

  return hash >>> 0;
}

function numberToBytes(num: number): number[] {
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setFloat64(0, num, true);
  return Array.from(new Uint8Array(buffer));
}

// Test distribution quality
interface DistributionStats {
  buckets: number[];
  mean: number;
  stdDev: number;
  chiSquared: number;
  maxBucket: number;
  minBucket: number;
  collisions: number;
}

function analyzeDistribution(
  values: number[],
  bucketCount: number,
  hashFn: (n: number) => number,
): DistributionStats {
  const buckets = new Array(bucketCount).fill(0);
  const seen = new Map<number, number>();
  let collisions = 0;

  for (const value of values) {
    const hash = hashFn(value);
    const bucket = Math.abs(hash) % bucketCount;
    buckets[bucket]++;

    // Track collisions (same hash for different inputs)
    if (seen.has(hash)) {
      collisions++;
    } else {
      seen.set(hash, value);
    }
  }

  // Calculate statistics
  const expectedPerBucket = values.length / bucketCount;
  const mean = values.length / bucketCount;

  // Standard deviation
  const variance =
    buckets.reduce((sum, count) => {
      return sum + Math.pow(count - mean, 2);
    }, 0) / bucketCount;
  const stdDev = Math.sqrt(variance);

  // Chi-squared test
  const chiSquared = buckets.reduce((sum, observed) => {
    return sum + Math.pow(observed - expectedPerBucket, 2) / expectedPerBucket;
  }, 0);

  return {
    buckets,
    mean,
    stdDev,
    chiSquared,
    maxBucket: Math.max(...buckets),
    minBucket: Math.min(...buckets),
    collisions,
  };
}

// Test cases
function runTests() {
  console.log("Hash Distribution Analysis");
  console.log("==========================\n");

  const bucketSizes = [10, 20, 100];
  const testCases = [
    {
      name: "Sequential numbers (1-1000)",
      values: Array.from({ length: 1000 }, (_, i) => i + 1),
    },
    {
      name: "Random large numbers",
      values: Array.from({ length: 1000 }, () =>
        Math.floor(Math.random() * Number.MAX_SAFE_INTEGER),
      ),
    },
    {
      name: "PR numbers simulation (1000-9999)",
      values: Array.from(
        { length: 1000 },
        () => Math.floor(Math.random() * 9000) + 1000,
      ),
    },
    {
      name: "Edge cases",
      values: [
        0,
        -1,
        -100,
        -1000,
        Number.MAX_SAFE_INTEGER,
        Number.MIN_SAFE_INTEGER,
        Math.pow(2, 32) - 1,
        Math.pow(2, 31) - 1,
        ...Array.from({ length: 100 }, (_, i) => i),
      ],
    },
  ];

  for (const testCase of testCases) {
    console.log(`\nTest Case: ${testCase.name}`);
    console.log("-".repeat(50));

    for (const bucketCount of bucketSizes) {
      console.log(`\nBucket Count: ${bucketCount}`);

      // Test simpleHash
      const simpleStats = analyzeDistribution(
        testCase.values,
        bucketCount,
        simpleHashMultiple,
      );

      // Test fnv1a
      const fnv1aStats = analyzeDistribution(
        testCase.values,
        bucketCount,
        fnv1a,
      );

      console.log("\nSimple Hash (with 5 iterations):");
      printStats(simpleStats);

      console.log("\nFNV-1a Hash:");
      printStats(fnv1aStats);

      // Compare
      console.log("\nComparison:");
      console.log(`  Chi-squared (lower is better):`);
      console.log(`    Simple: ${simpleStats.chiSquared.toFixed(2)}`);
      console.log(`    FNV-1a: ${fnv1aStats.chiSquared.toFixed(2)}`);
      console.log(
        `    Winner: ${simpleStats.chiSquared < fnv1aStats.chiSquared ? "Simple Hash" : "FNV-1a"}`,
      );

      console.log(`  Standard Deviation (lower is better):`);
      console.log(`    Simple: ${simpleStats.stdDev.toFixed(2)}`);
      console.log(`    FNV-1a: ${fnv1aStats.stdDev.toFixed(2)}`);
      console.log(
        `    Winner: ${simpleStats.stdDev < fnv1aStats.stdDev ? "Simple Hash" : "FNV-1a"}`,
      );

      console.log(`  Collisions:`);
      console.log(`    Simple: ${simpleStats.collisions}`);
      console.log(`    FNV-1a: ${fnv1aStats.collisions}`);
    }
  }

  // Visual distribution test
  console.log("\n\nVisual Distribution Test (Sequential 1-50 → 20 buckets)");
  console.log("=".repeat(60));

  console.log("\nSimple Hash mapping:");
  for (let i = 1; i <= 50; i++) {
    const hash = simpleHashMultiple(i);
    const bucket = Math.abs(hash) % 20;
    console.log(`  ${i} → bucket ${bucket}`);
  }

  console.log("\nFNV-1a mapping:");
  for (let i = 1; i <= 50; i++) {
    const hash = fnv1a(i);
    const bucket = Math.abs(hash) % 20;
    console.log(`  ${i} → bucket ${bucket}`);
  }

  // Collision test with small numbers
  console.log("\n\nCollision Test (mapping to 20 buckets)");
  console.log("=".repeat(40));

  const collisionTest = Array.from({ length: 100 }, (_, i) => i);
  const simpleBuckets = new Map<number, number[]>();
  const fnvBuckets = new Map<number, number[]>();

  for (const num of collisionTest) {
    const simpleBucket = Math.abs(simpleHashMultiple(num)) % 20;
    const fnvBucket = Math.abs(fnv1a(num)) % 20;

    if (!simpleBuckets.has(simpleBucket)) {
      simpleBuckets.set(simpleBucket, []);
    }
    simpleBuckets.get(simpleBucket)!.push(num);

    if (!fnvBuckets.has(fnvBucket)) {
      fnvBuckets.set(fnvBucket, []);
    }
    fnvBuckets.get(fnvBucket)!.push(num);
  }

  console.log("\nSimple Hash bucket collisions:");
  for (const [bucket, values] of simpleBuckets) {
    if (values.length > 5) {
      console.log(
        `  Bucket ${bucket}: ${values.length} items (${values.slice(0, 10).join(", ")}...)`,
      );
    }
  }

  console.log("\nFNV-1a bucket collisions:");
  for (const [bucket, values] of fnvBuckets) {
    if (values.length > 5) {
      console.log(
        `  Bucket ${bucket}: ${values.length} items (${values.slice(0, 10).join(", ")}...)`,
      );
    }
  }
}

function printStats(stats: DistributionStats) {
  console.log(`  Expected per bucket: ${stats.mean.toFixed(2)}`);
  console.log(`  Std deviation: ${stats.stdDev.toFixed(2)}`);
  console.log(`  Chi-squared: ${stats.chiSquared.toFixed(2)}`);
  console.log(`  Min/Max bucket: ${stats.minBucket}/${stats.maxBucket}`);
  console.log(`  Collisions: ${stats.collisions}`);

  // Show bucket distribution
  const bucketStr = stats.buckets.map((count, i) => `${i}:${count}`).join(" ");
  console.log(`  Distribution: ${bucketStr}`);
}

// Run the tests
runTests();
