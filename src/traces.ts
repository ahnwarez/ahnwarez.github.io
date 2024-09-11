export function getTrace(exampleName: string) {
  const traceExamples = {
    yi: ' L 4546,1',
    yi2: ' M 1234,1',
  } as const

  const traceFound = traceExamples[exampleName]
  return traceFound
}

export function parse(text: string, s: number, b: number) {
  const lines = text.split('\n')
  const addresses = []
  for (const line of lines) {
    if (line.startsWith('I')) continue
    const [instruction, addressAndByte] = line.trimStart().split(' ')
    const [addressDigits] = addressAndByte.split(',')
    const address = Number(addressDigits)

    const setIndex = (BigInt(address) >> BigInt(b)) & ((1n << BigInt(s)) - 1n)
    const tag = BigInt(address) >> BigInt(s + b)
    const B = BigInt(address) & ((1n << BigInt(b)) - 1n)
    addresses.push({ instruction, address, tag, setIndex, B })
  }

  return addresses
}
