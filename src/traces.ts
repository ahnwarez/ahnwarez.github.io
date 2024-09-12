export function getTrace(exampleName: string) {
  const traceExamples = {
    yi: ` L 10,1
 M 20,1
 L 22,1
 S 18,1
 L 110,1
 L 210,1
 M 12,1`,
    yi2: ` S 00602264,1
 L 00602260,4
 L 0060225c,4
 L 00602400,8
 S 7fefe05a8,8
 S 7fefe05a0,8
 S 7fefe058c,4
 S 7fefe0588,4
 S 7fefe0580,8
 S 7fefe0578,8
 L 7fefe058c,4
 S 7fefe0570,4
 L 7fefe0588,4
 S 7fefe0574,4
 S 7fefe0590,4
 L 7fefe0590,4
 L 7fefe0588,4
 S 7fefe0594,4
 L 7fefe0594,4
 L 7fefe058c,4
 L 7fefe0590,4
 S 7fefe0598,4
 L 7fefe0590,4
 L 7fefe0598,4
 L 7fefe0598,4
 L 7fefe0588,4
 L 7fefe0594,4
 S 7fefe059c,4
 L 7fefe0594,4
 L 7fefe059c,4
 L 7fefe059c,4
 L 7fefe058c,4
 L 7fefe059c,4
 L 7fefe0574,4
 L 7fefe0578,8
 L 7fefe0598,4
 L 7fefe0598,4
 L 7fefe0570,4
 L 7fefe0580,8
 L 7fefe059c,4
`,
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
