import { Button } from './components/ui/button'
import { Slider } from './components/ui/slider'
import { Label } from './components/ui/label'
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from './components/ui/table'

import { getTrace, parse } from './traces'
import { useEffect, useState } from 'react'
import { getCache } from './cache'

export function App() {
  const [selectedExample, setSelectedExample] = useState('yi2')
  const [word, setWord] = useState(16)
  const [s, setS] = useState(4)
  const [E, setE] = useState(1)
  const [b, setb] = useState(4)
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

  const trace = parse(getTrace(selectedExample), s, b)

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
  }, [s, E, b, pc, selectedExample])

  function handleChange_s(values: number[]) {
    const s = values[0]
    setS(() => s)
  }
  function handleChange_E(values: number[]) {
    const E = values[0]
    setE(() => E)
  }

  function handleChange_b(values: number[]) {
    const b = values[0]
    setb(() => b)
  }

  function handlePC(values: number[]) {
    const pc = values[0]
    setPC(() => pc)
  }
  function handleChangeWord(value: string) {
    const wordSize = Number(value)
    setWord(() => wordSize)
  }
  function handleChangeSelectedExampe(name: string) {
    setSelectedExample(() => name)
    setPC(() => 0)
  }

  const S = 1 << s
  const B = 1 << b
  const C = S * E * B

  return (
    <div className="p-4 text-xl">
      <div className="flex flex-col gap-y-4">
        <div className="space-y-4">
          <div className="space-x-4">
            <Button
              variant="link"
              onClick={() => handleChangeSelectedExampe('yi')}
            >
              yi.trace
            </Button>
            <Button
              variant="link"
              onClick={() => handleChangeSelectedExampe('yi2')}
            >
              yi2.trace
            </Button>
            <Button
              variant="link"
              onClick={() => handleChangeSelectedExampe('trans')}
            >
              trans.trace
            </Button>
            <Button
              variant="link"
              onClick={() => handleChangeSelectedExampe('dave')}
            >
              dave.trace
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Card id="parameters">
            <CardContent className="space-y-4 pt-4">
              <div>
                <label>Word size</label>
                <RadioGroup
                  className="flex"
                  defaultValue={word.toString()}
                  onValueChange={handleChangeWord}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="8" id="r8" />
                    <Label htmlFor="r8">8</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="16" id="r16" />
                    <Label htmlFor="r16">16</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="32" id="r32" />
                    <Label htmlFor="r32">32</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="64" id="r64" />
                    <Label htmlFor="r64">64</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="flex justify-between">
                  <label>s</label>
                  <p>{s}</p>
                </div>
                <Slider
                  step={1}
                  min={1}
                  max={10}
                  value={[s]}
                  onValueChange={handleChange_s}
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="flex justify-between">
                  <label>E</label>
                  <p>{E}</p>
                </div>
                <Slider
                  step={1}
                  min={1}
                  max={10}
                  value={[E]}
                  onValueChange={handleChange_E}
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <div className="flex justify-between">
                  <label>b</label>
                  <p>{b}</p>
                </div>
                <Slider
                  step={1}
                  min={1}
                  max={10}
                  value={[b]}
                  onValueChange={handleChange_b}
                />
              </div>
            </CardContent>
          </Card>
          <Card id="parameters">
            <CardHeader>
              <CardTitle>Cache size</CardTitle>
              <CardDescription>
                <p>
                  S = 2<sup>s</sup>
                </p>
                <p>E: number of cache lines</p>
                <p>
                  B = 2<sup>b</sup>
                </p>
                <div>
                  <code>
                    C = S * E * B ={' '}
                    <span className="text-foreground">{C} bytes</span>
                  </code>
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="grid grid-cols-2 gap-4">
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
          <div id="addresses" className=" overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{''}</TableHead>
                  <TableHead>Inst.</TableHead>
                  <TableHead>Address (Hex)</TableHead>
                  <TableHead>Address (Binary)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="font-mono">
                {trace.map((t, i) => (
                  <TableRow key={t.address}>
                    <TableCell className="text-foreground size-8">
                      {i === pc ? '→' : ''}
                    </TableCell>
                    <TableCell> {t.instruction}</TableCell>
                    <TableCell className="text-left">
                      0x{t.address.toString(16)}
                    </TableCell>
                    <TableCell className="text-left">
                      <span className="text-amber-600">
                        {t.tag.toString(2).padStart(word, '0')}
                      </span>
                      <span className="text-green-600">
                        {t.setIndex.toString(2).padStart(s, '0')}
                      </span>
                      <span className="text-muted-foreground">
                        {t.B.toString(2).padStart(b, '0')}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="text-foreground size-8">
                    {trace.length === pc ? '→' : ''}
                  </TableCell>
                  <TableCell className="text-zinc-600">End</TableCell>
                </TableRow>
              </TableBody>
            </Table>
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
                          line.valid
                            ? 'text-foreground'
                            : 'text-muted-foreground'
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
      </div>
    </div>
  )
}
