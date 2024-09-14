export enum BlockStates {
  Empty = 0,
  Valid,
  Evicted,
}

export interface Block {
  index: bigint
  state: BlockStates
}

export type Sets = ReturnType<typeof makeCache>['sets']

// type Addresses = ReturnType<typeof parse>
// interface Args {
//   address: Addresses[number]
//   oldSets: Array<Array<{ valid: boolean; tag: bigint; blockIndex: Block }>>
//   s: number
//   E: number
//   b: number
//   pc: number
// }

export function makeCache({ s, E, b }: { s: number; E: number; b: number }) {
  let hits = 0
  let misses = 0
  let evictions = 0

  let sets = Array.from({ length: 2 ** s }).map(() =>
    Array.from({ length: E }).map(() => ({
      valid: false,
      blockIndex: 0n,
      tag: 0n,
      state: BlockStates.Empty,
    })),
  )

  return Object.freeze({
    sets,
    getState,
    access,
  })

  function getState() {
    return { hits, misses, evictions }
  }

  function access(address: number) {
    const setIndex = (BigInt(address) >> BigInt(b)) & ((1n << BigInt(s)) - 1n)
    const tag = BigInt(address) >> BigInt(s + b)
    const setNumber = Number(setIndex)
    const set = sets[setNumber]
    const blockIndex = BigInt(address) & (1n << (BigInt(b) - 1n))

    // Check for hit
    for (let i = 0; i < set.length; i++) {
      if (set[i].valid && set[i].tag === tag) {
        hits++
        set[i].blockIndex = blockIndex
        set[i].state = BlockStates.Valid
        return { hit: 1, miss: 0, eviction: 0 }
      }
    }

    // It's a miss, find an empty line or evict
    const emptyLineIndex = set.findIndex((line) => !line.valid)

    if (emptyLineIndex !== -1) {
      sets[setNumber][emptyLineIndex] = {
        valid: true,
        tag,
        blockIndex: blockIndex,
        state: BlockStates.Valid,
      }
      misses++
      return { hit: 0, miss: 1, eviction: 0 }
    } else {
      misses++
      evictions++
      // Eviction (assuming LRU policy, we evict the first line)
      sets[setNumber][0] = {
        valid: true,
        tag,
        blockIndex,
        state: BlockStates.Evicted,
      }
      return { hit: 0, miss: 1, eviction: 1 }
    }
  }
}
