import { yi } from './traces/yi'
import { yi2 } from './traces/yi2'
import { dave } from './traces/dave'
import { trans } from './traces/trans'

export function getProgramString(exampleName: string) {
  const traceExamples = {
    yi,
    yi2,
    dave,
    trans,
  } as const

  if (exampleName in traceExamples) {
    return traceExamples[exampleName]
  }
  return null
}

export function parse(s: number, b: number, text: string) {
  const lines = text.split('\n')
  const addresses = []
  let i = 0
  for (const line of lines) {
    if (line.startsWith('I') || line == '') continue
    const [instruction, addressAndByte] = line.trimStart().split(' ')
    const [addressDigits] = addressAndByte.split(',')

    const address = Number('0x' + addressDigits)

    const setIndex = (BigInt(address) >> BigInt(b)) & ((1n << BigInt(s)) - 1n)
    const tag = BigInt(address) >> BigInt(s + b)
    const B = BigInt(address) & ((1n << BigInt(b)) - 1n)
    addresses.push({
      i,
      instruction,
      address,
      tag,
      setIndex,
      B,
      hit: 0,
      miss: 0,
      eviction: 0,
    })
    i++
  }

  return addresses
}
