import { parse } from '../traces'
import { initSet } from '../App'

type Addresses = ReturnType<typeof parse>

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

export function CacheView({ addresses, s, b, word, B, sets }: CacheViewProps) {
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
