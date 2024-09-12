export function getTrace(exampleName: string) {
  const traceExamples = {
    yi: ` L 10,1
 M 20,1
 L 22,1
 S 18,1
 L 110,1
 L 210,1
 M 12,1`,
    yi2: ' M 1234,1',
  } as const

  const traceFound = traceExamples[exampleName]
  return traceFound
}

export function parse(text: string, s: number, b: number, m: number) {
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
    const tagBits = m - (s + b)
    addresses.push({ i, instruction, address, tag, tagBits, setIndex, B })
    i++
  }

  return addresses
}
