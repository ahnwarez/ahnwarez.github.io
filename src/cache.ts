export function getCache({
  address,
  sets,
  s,
  b,
}: {
  address: number
  sets: Array<Array<{ valid: boolean; tag: bigint }>>
  s: number
  E: number
  b: number
}) {
  const setIndex = (BigInt(address) >> BigInt(b)) & ((1n << BigInt(s)) - 1n)
  const tag = BigInt(address) >> BigInt(s + b)

  const setNumber = Number(setIndex)
  const set = sets[setNumber]

  // Check for hit
  for (let i = 0; i < set.length; i++) {
    if (set[i].valid && set[i].tag === tag) {
      return { hit: 1, miss: 0, eviction: 0, sets }
    }
  }

  // It's a miss, find an empty line or evict
  const emptyLineIndex = set.findIndex((line) => !line.valid)

  if (emptyLineIndex !== -1) {
    sets[setNumber][emptyLineIndex] = { valid: true, tag }
    return { hit: 0, miss: 1, eviction: 0, sets }
  } else {
    // Eviction (assuming LRU policy, we evict the first line)
    sets[setNumber][0] = { valid: true, tag }
    return { hit: 0, miss: 1, eviction: 1, sets }
  }
}
