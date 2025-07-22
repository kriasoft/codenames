# ADR-001: Hash Function Selection for Codename Generation

## Status

Accepted

## Context

The codenames library needs to convert numerical values (like PR numbers) into human-readable names from a themed word list. This conversion must be:

- **Deterministic**: The same input always produces the same output
- **Well-distributed**: Sequential inputs should map to different outputs
- **Fast**: Sub-millisecond performance for any input
- **Collision-resistant**: Different inputs should rarely map to the same bucket
- **Edge-case resilient**: Handle special values (0, negative numbers, MAX_SAFE_INTEGER)

Key considerations:

- Primary use case is PR numbers (typically 1000-9999 range)
- Default word list size is 20 items (cities)
- Must work in both Node.js, edge, and browser environments
- No external dependencies preferred

## Decision

We chose the **FNV-1a (Fowler-Noll-Vo) hash algorithm** for converting numbers to array indices.

### Implementation Details

The implementation consists of three parts:

1. **Number to bytes conversion**: Convert the input number to a byte array using Float64 representation
2. **FNV-1a hashing**: Apply the FNV-1a algorithm to generate a 32-bit hash
3. **Modulo mapping**: Use modulo operation to map the hash to a word list index

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

## Consequences

### Positive

1. **Industry-standard algorithm**: FNV-1a is well-established with proven reliability
2. **Excellent distribution for PR numbers**: Chi-squared test shows better distribution than alternatives for the 1000-9999 range
3. **Handles edge cases well**: Gracefully handles 0, negative numbers, and JavaScript's MAX_SAFE_INTEGER
4. **Fast performance**: All operations complete in under 1ms
5. **No dependencies**: Pure JavaScript implementation works everywhere

### Negative

1. **Slightly worse for small sequential numbers**: For sequential inputs (1-1000) with small bucket counts (10-20), simpleHash performs marginally better
2. **More complex than alternatives**: Requires byte conversion step, making it harder to understand than a simple XOR-based hash
3. **Overkill for small word lists**: The algorithm's strength is most apparent with larger bucket counts (100+)

### Neutral

1. **Float64 representation**: Using Float64 for byte conversion ensures consistent results across platforms but adds a conversion step
2. **32-bit output**: Sufficient for our use case but limits the hash space compared to 64-bit alternatives

## Alternatives Considered

1. **Simple Hash with iterations**: XOR-based hash applied multiple times
   - Rejected because: Worse distribution for PR number ranges (1000-9999) and less proven in production

2. **Direct modulo**: Simply use `input % wordList.length`
   - Rejected because: Sequential inputs produce sequential outputs, defeating the purpose

3. **MurmurHash**: Another popular non-cryptographic hash
   - Rejected because: More complex implementation with no significant benefits for our use case

## Implementation Guidelines

1. Always validate input is a finite number before hashing
2. Use unsigned 32-bit arithmetic (`>>> 0`) to ensure positive hash values
3. Apply `Math.abs()` before modulo to handle any edge cases
4. The hash function is internal - only expose the high-level `codename()` function

## Related Decisions

- ADR-002: Word List Structure and Themes (future)
- ADR-003: TypeScript Types and Exports (future)

## References

- [FNV Hash Algorithm](http://www.isthe.com/chongo/tech/comp/fnv/)
- [Hash Distribution Analysis Report](../analysis/hash-distribution-report.md)
- [JavaScript Math.imul() documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul)

## Notes

The analysis showed that while both simpleHash and FNV-1a provide adequate distribution for the codenames use case, FNV-1a's superior handling of the primary use case (PR numbers) and its proven track record make it the better choice. The performance difference is negligible, and the slight complexity increase is justified by the improved reliability and distribution characteristics.
