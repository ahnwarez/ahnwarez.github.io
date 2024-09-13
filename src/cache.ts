import { parse } from './traces'

type Addresses = ReturnType<typeof parse>
interface Args {
  addresses: Addresses
  oldSets: Array<Array<{ valid: boolean; tag: bigint }>>
  s: number
  E: number
  b: number
  pc: number
}
export function nextCache({ addresses, s, b, pc, oldSets }: Args) {
  const newSets = [...oldSets]
  const newAddresses = addresses.map((address, currentIndex) => {
    if (currentIndex > pc - 1) {
      return address
    }

    const setIndex =
      (BigInt(address.address) >> BigInt(b)) & ((1n << BigInt(s)) - 1n)
    const tag = BigInt(address.address) >> BigInt(s + b)

    const setNumber = Number(setIndex)
    const newSet = newSets[setNumber]

    // Check for hit
    for (let i = 0; i < newSet.length; i++) {
      if (newSet[i].valid && newSet[i].tag === tag) {
        return {
          ...address,
          hit: 1,
        }
      }
    }

    // It's a miss, find an empty line or evict
    const emptyLineIndex = newSet.findIndex((line) => !line.valid)

    if (emptyLineIndex !== -1) {
      newSets[setNumber][emptyLineIndex] = { valid: true, tag }
      return {
        ...address,
        miss: 1,
      }
    } else {
      // Eviction (assuming LRU policy, we evict the first line)
      newSets[setNumber][0] = { valid: true, tag }
      return { ...address, miss: 1, eviction: 1 }
    }
  })

  return { addresses: newAddresses, newSets }
}
