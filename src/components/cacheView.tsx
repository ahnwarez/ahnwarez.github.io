import { parse } from '../traces'
import { initSet } from '../App'
import clsx from 'clsx'
import { BlockStates } from '../cache'

type Addresses = ReturnType<typeof parse>
type Set = ReturnType<typeof initSet>

interface CacheViewProps {
  word: number
  s: number
  b: number
  B: number
  E: number
  pc: number
  addresses: Addresses
  sets: ReturnType<typeof initSet>
}

export function CacheView({ addresses, s, b, word, sets }: CacheViewProps) {
  const summary = addresses.reduce(
    (acc, v) => ({
      hits: acc.hits + v.hit,
      misses: acc.misses + v.miss,
      evictions: acc.evictions + v.eviction,
    }),
    { hits: 0, misses: 0, evictions: 0 },
  )
  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <div className="flex gap-2">
          <p>Hits {summary.hits}</p>
          <p>Misses {summary.misses}</p>
          <p>Evictions {summary.evictions}</p>
        </div>
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
            <div id="lines">
              {lines.map((line, i) => (
                <div id="line" className="flex gap-x-2 items-center" key={i}>
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
                  <div className="flex ml-4 border bg-muted">
                    {Array.from({ length: b }, (_, i) => BigInt(i)).map(
                      (current) => (
                        <div
                          className={clsx(
                            'w-10 h-10',
                            Number(current) === Number(line.blockIndex.index)
                              ? getColorState(line.blockIndex.state)
                              : '',
                          )}
                        ></div>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function getColorState(state: Set[number][number]['blockIndex']['state']) {
  if (state === BlockStates.Valid) return 'bg-primary'
  else if (state === BlockStates.Evicted) return 'bg-primary opacity-50'
  else return ''
}
