export function getProgramString(exampleName: string) {
  const traceExamples = {
    yi: ` L 10,1
 M 20,1
 L 22,1
 S 18,1
 L 110,1
 L 210,1
 M 12,1`,
    yi2: ` L 50,1
 M 40,1
 L 32,1
 S 38,1
 L 40,1
 L 10,1
 M 32,1`,
  } as const

  return traceExamples[exampleName]
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
