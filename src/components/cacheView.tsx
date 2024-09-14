import { Sets } from '../cache'

interface CacheViewProps {
  word: number
  s: number
  b: number
  B: number
  E: number
  pc: number
  sets: Sets
}

export function CacheView({ s, b, word, sets }: CacheViewProps) {
  return (
    <div className="flex flex-col">
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
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
