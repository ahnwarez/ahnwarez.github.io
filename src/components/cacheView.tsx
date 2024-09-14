import clsx from 'clsx'
import { BlockStates, Sets } from '../cache'

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
    <div id="sets" className="flex flex-col text-sm font-mono gap-1">
      {sets.map((lines, i) => (
        <div key={i} className="flex items-center divide">
          <p className=" text-green-600">{i.toString(2).padStart(s, '0')}</p>
          <div id="lines">
            {lines.map((line, i) => (
              <div id="line" className="flex gap-x-2 items-center" key={i}>
                <span className="text-amber-600">
                  {line.tag.toString(2).padStart(word - (s + b), '0')}
                </span>
                <div className="flex ml-2 bg-muted">
                  {Array.from({ length: b }, (_, i) => BigInt(i)).map(
                    (current) => (
                      <div
                        className={clsx(
                          'w-10 h-10 border border-background text-center flex items-center justify-center',
                          line.valid ? 'bg-primary' : '',
                        )}
                      >
                        {Number(current) === Number(line.blockIndex) &&
                          line.valid
                          ? '×'
                          : ''}
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function getColorState(state: Sets[number][number]['state']) {
  if (state === BlockStates.Valid) return 'bg-primary'
  else if (state === BlockStates.Evicted) return 'bg-primary opacity-50'
  else return ''
}
