import { parse } from './traces'

export enum BlockStates {
  Empty = 0,
  Valid,
  Evicted,
}

export interface Block {
  index: bigint
  state: BlockStates
}

type Addresses = ReturnType<typeof parse>
interface Args {
  addresses: Addresses
  oldSets: Array<Array<{ valid: boolean; tag: bigint; blockIndex: Block }>>
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
    const blockIndex = BigInt(address.address) & ((1n << BigInt(b)) - 1n)

    // Check for hit
    for (let i = 0; i < newSet.length; i++) {
      if (newSet[i].valid && newSet[i].tag === tag) {
        newSet[i].blockIndex = { index: blockIndex, state: BlockStates.Valid }
        return {
          ...address,
          hit: 1,
        }
      }
    }

    // It's a miss, find an empty line or evict
    const emptyLineIndex = newSet.findIndex((line) => !line.valid)

    if (emptyLineIndex !== -1) {
      newSets[setNumber][emptyLineIndex] = {
        valid: true,
        tag,
        blockIndex: { index: blockIndex, state: BlockStates.Valid },
      }
      return {
        ...address,
        miss: 1,
      }
    } else {
      // Eviction (assuming LRU policy, we evict the first line)
      newSets[setNumber][0] = {
        valid: true,
        tag,
        blockIndex: { index: blockIndex, state: BlockStates.Evicted },
      }
      return { ...address, miss: 1, eviction: 1 }
    }
  })

  return { addresses: newAddresses, newSets }
}
