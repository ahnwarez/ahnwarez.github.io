import { twMerge } from 'tailwind-merge'

function App() {
  return (
    <div className="flex p-4 gap-x-8">
      <div className="flex flex-col gap-y-4">
        <div className="space-y-4">
          <div className="space-x-4">
            <button className="underline text-blue-500">yi.trace</button>
            <button className="underline text-blue-500">yi2.trace</button>
            <button className="underline text-blue-500">trans.trace</button>
          </div>
          <input type="file" />
        </div>
        <div id="parameters" className="border border-zinc-300 p-4 rounded">
          <div className="flex items-center gap-x-2">
            <p>4</p>
            <input type="range" min="1" max="10" />
            <label>s</label>
          </div>

          <div className="flex items-center gap-x-2">
            <p>1</p>
            <input type="range" min="1" max="10" />
            <label>E</label>
          </div>

          <div className="flex items-center gap-x-2">
            <p>4</p>
            <input type="range" min="1" max="10" />
            <label>b</label>
          </div>
          <div>
            <pre>
              <code>C = S * E * B = 16 bytes</code>
            </pre>
          </div>
        </div>
        <div id="trace" className="border border-zinc-300 rounded p-4">
          <table className="table-auto">
            <thead>
              <tr>
                <Td>{''}</Td>
                <Td>Inst.</Td>
                <Td>Address</Td>
                <Td>Tag</Td>
                <Td>SI</Td>
                <Td>B</Td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td className="text-zinc-600 size-8"> →</Td>
                <Td className="text-zinc-600"> L</Td>
                <Td className="text-zinc-600 text-right">0x54C</Td>
                <Td className="text-amber-600">0000</Td>
                <Td className="text-green-600">1000</Td>
                <Td className="text-zinc-600">1111</Td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="cache">
        <div id="controls" className="space-x-4">
          <button>Next</button>
          <button>Reset</button>
        </div>
        <div id="sets" className="space-y-2">
          <div
            id="set"
            className="flex gap-x-4 border border-zinc-300 rounded p-4 items-center"
          >
            <p>
              Set <span className="text-green-600">0</span>
            </p>
            <div className="flex gap-x-4 border border-zinc-300 rounded p-2">
              <div id="valid" className="text-pink-600">
                1
              </div>
              <div id="tag" className="text-amber-600">
                01000
              </div>
            </div>
          </div>
          <div
            id="set"
            className="flex gap-x-4 border border-zinc-300 rounded p-4 items-center"
          >
            <p>
              Set <span className="text-green-600">0</span>
            </p>
            <div className="flex gap-x-4 border border-zinc-300 rounded p-2">
              <div id="valid" className="text-pink-600">
                1
              </div>
              <div id="tag" className="text-amber-600">
                01000
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Td({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string | undefined | null
}) {
  return (
    <td
      className={twMerge(
        'border border-zinc-400 rounded p-2 text-center',
        className,
      )}
    >
      {children}
    </td>
  )
}
export default App
