export function getTrace(exampleName: string) {
  const traceExamples = {
    yi: ' L 4546,1',
  } as const

  const traceFound = traceExamples[exampleName]
  return traceFound
}
