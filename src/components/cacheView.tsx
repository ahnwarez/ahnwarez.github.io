import { Slider } from '@radix-ui/react-slider'
import { useEffect, useState } from 'react'
import { parse } from '../traces'
import { getCache } from '../cache'

type Trace = ReturnType<typeof parse>

interface CacheViewProps {
  word: number
  s: number
  b: number
  B: number
  E: number
  trace: Trace
}

export function CacheView({ s, b, word, E, B, trace }: CacheViewProps) {
  const [pc, setPC] = useState(0)
  const [hits, setHits] = useState(0)
  const [misses, setMisses] = useState(0)
  const [evictions, setEvictions] = useState(0)

  const [sets, setSets] = useState(
    Array(2 ** s)
      .fill(() => 0)
      .map(() =>
        Array(E)
          .fill(() => 0)
          .map(() => ({
            valid: false,
            tag: 0n,
          })),
      ),
  )

  useEffect(() => {
    let hits = 0
    let misses = 0
    let evictions = 0
    trace.slice(0, pc).forEach((trace) => {
      const {
        hit,
        eviction,
        miss,
        sets: newSets,
      } = getCache({
        address: trace.address,
        sets,
        s,
        E,
        b,
      })
      setSets(() => newSets)
      if (trace.instruction === 'M') {
        const {
          hit,
          eviction,
          miss,
          sets: newSets,
        } = getCache({
          address: trace.address,
          sets,
          s,
          E,
          b,
        })
        hits += hit
        misses += miss
        evictions += eviction
        setSets(() => newSets)
      }
      hits += hit
      misses += miss
      evictions += eviction
    })

    setHits(() => hits)
    setMisses(() => misses)
    setEvictions(() => evictions)
  }, [s, E, b, pc])

  function handlePC(values: number[]) {
    const pc = values[0]
    setPC(() => pc)
  }

  return (
    <div className="flex flex-col">
      <div id="controls" className="space-x-4 flex justify-end">
        <Slider
          min={0}
          max={trace.length}
          step={1}
          value={[pc]}
          onValueChange={handlePC}
        />
      </div>

      <div className="flex gap-2">
        <p>Hits: {hits}</p>
        <p>Misses: {misses}</p>
        <p>Eviction: {evictions}</p>
      </div>
      <div
        id="sets"
        className="flex flex-col bg-card rounded-lg p-4 text-sm font-mono"
      >
        {sets.map((lines, i) => (
          <div key={i} className="flex gap-x-8 items-center border p-2 m-2">
            <p className="w-24 text-green-600">
              {i.toString(2).padStart(s, '0')}
            </p>
            <div id="line">
              {lines.map((line, i) => (
                <div id="line" className="space-x-2" key={i}>
                  <span
                    className={
                      line.valid ? 'text-foreground' : 'text-muted-foreground'
                    }
                  >
                    {line.valid ? '1' : '0'}
                  </span>
                  <span className="text-amber-600">
                    {line.tag.toString(2).padStart(word - (s + b), '0')}
                  </span>
                  <span className="text-muted-foreground">{B} bytes</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
