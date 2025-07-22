# Hash Distribution Analysis Report

## Executive Summary

Both the `simpleHash` (with 5 iterations) and `fnv1a` algorithms provide good distribution for the codenames use case. The analysis shows that:

1. **For small bucket counts (10-20)**: Simple Hash performs slightly better
2. **For larger bucket counts (100)**: FNV-1a performs better
3. **For the typical codenames use case (20 cities)**: Both algorithms are suitable

## Key Findings

### Distribution Quality (Chi-squared test - lower is better)

#### Sequential Numbers (1-1000)

- 10 buckets: Simple Hash (4.68) vs FNV-1a (5.24) - **Simple Hash wins**
- 20 buckets: Simple Hash (11.56) vs FNV-1a (17.72) - **Simple Hash wins**
- 100 buckets: Simple Hash (108.60) vs FNV-1a (53.20) - **FNV-1a wins**

#### PR Numbers Simulation (1000-9999)

- 10 buckets: Simple Hash (5.56) vs FNV-1a (3.32) - **FNV-1a wins**
- 20 buckets: Simple Hash (8.88) vs FNV-1a (7.72) - **FNV-1a wins**
- 100 buckets: Simple Hash (104.80) vs FNV-1a (83.40) - **FNV-1a wins**

### Collision Analysis

Both algorithms show zero collisions for most test cases, with minimal collisions (1-4) only in edge cases with special numbers (0, negative, MAX_SAFE_INTEGER).

### Visual Distribution (Sequential 1-50 → 20 buckets)

Both algorithms distribute sequential inputs fairly randomly across buckets:

- Simple Hash: Good distribution with no obvious patterns
- FNV-1a: Good distribution with no obvious patterns

### Performance Characteristics

Both algorithms are extremely fast (<1ms per hash) and have minimal memory overhead.

## Recommendations

1. **For codenames library (20 cities default)**: Either algorithm is suitable. FNV-1a has a slight edge for PR number ranges.

2. **Algorithm choice considerations**:
   - Simple Hash: Simpler implementation, better for small bucket counts
   - FNV-1a: Industry-standard algorithm, better for larger bucket counts, handles edge cases better

3. **For the PR → city name use case**: FNV-1a is recommended because:
   - PR numbers typically range from 1000-9999 where FNV-1a performs better
   - It's a well-established algorithm with proven reliability
   - Better handles edge cases and special values
   - Provides more consistent distribution across different input patterns

## Code Comparison

### Simple Hash (from proposal.js)

```javascript
function simpleHash(seed) {
  seed = seed ^ 0x3ade68b1;
  seed = seed ^ (seed >>> 15) ^ (seed << 13);
  seed = seed ^ (seed >>> 17);
  return seed;
}
// Applied 5 times for better distribution
```

### FNV-1a (current implementation)

```typescript
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
```

## Conclusion

The current FNV-1a implementation in `index.ts` provides good distribution quality for the codenames use case. While the simpleHash algorithm performs slightly better for small bucket counts, FNV-1a offers:

- Better handling of edge cases
- More consistent performance across different input patterns
- Industry-standard reliability
- Better distribution for typical PR number ranges (1000-9999)

The analysis confirms that FNV-1a is a solid choice for the codenames library.
