import { useState } from 'react'

import { Button } from './components/ui/button'
import { Slider } from './components/ui/slider'
import { Label } from './components/ui/label'
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group'
import { CacheView } from './components/cacheView'

import { getProgramString, parse } from './program'
import { makeCache } from './cache'
import { TraceView } from './components/traceView'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons'

export function App() {
  const [selectedExample, setSelectedExample] = useState<string>('yi')
  const [word, setWord] = useState(16)
  const [s, setS] = useState(4)
  const [E, setE] = useState(1)
  const [b, setb] = useState(4)
  const [pc, setPC] = useState(0)

  /*
   * derived states
   **/
  const S = 1 << s
  const B = 1 << b
  const C = S * E * B

  const programText = getProgramString(selectedExample)
  const program = parse(s, b, programText)
  const cache = makeCache({ s, E, b })
  for (let i = 0; i < pc; i++) {
    const address = program[i]
    const { hit, miss, eviction } = cache.access(address.address)
    address.hit = hit
    address.miss = miss
    address.eviction = eviction
    if (address.instruction === 'M') {
      const { hit, miss, eviction } = cache.access(address.address)
      address.hit += hit
      address.miss += miss
      address.eviction += eviction
    }
  }

  function handleChange_s(values: number[]) {
    setS(() => values[0])
  }

  function handleChange_E(values: number[]) {
    setE(() => values[0])
  }

  function handleChange_b(values: number[]) {
    setb(() => values[0])
  }

  function handleChangeWord(value: string) {
    setWord(() => Number(value))
  }

  function handleChangeSelectedExampe(name: string) {
    setSelectedExample(() => name)
    if (!selectedExample) {
      return
    }
  }

  function handlePcInrcement() {
    setPC((oldState) =>
      oldState < program.length ? oldState + 1 : program.length,
    )
  }
  function handlePcDecrement() {
    setPC((oldState) => (oldState > 0 ? oldState - 1 : 0))
  }

  return (
    <div className="border m-4 rounded-xl flex flex-col">
      <div className="border-b flex justify-between items-center">
        <h1 className="pl-4 font-bold text-lg">Interactive Cache</h1>
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
      <div className="flex flex-col justify-between gap-4 p-2">
        <div className="flex gap-2 justify-between items-center w-1/8">
          <div className="space-y-2">
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
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>S (sets)</p>
              <p className="text-muted-foreground">
                2<sup>{s}</sup> = {1 << s}
              </p>
            </div>
            <Slider
              step={1}
              min={0}
              max={10}
              value={[s]}
              onValueChange={handleChange_s}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>E (lines)</p>
              <p className="text-muted-foreground">{E}</p>
            </div>
            <Slider
              step={1}
              min={1}
              max={10}
              value={[E]}
              onValueChange={handleChange_E}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>B (blocks)</p>
              <p className="text-muted-foreground">
                2<sup>{b}</sup> = {1 << b} bytes
              </p>
            </div>
            <Slider
              step={1}
              min={1}
              max={10}
              value={[b]}
              onValueChange={handleChange_b}
            />
          </div>
          <div id="controls" className="flex gap-4">
            <Button onClick={() => setPC(() => 0)}>
              {' '}
              <DoubleArrowLeftIcon />
            </Button>
            <Button onClick={handlePcDecrement}>
              {' '}
              <ChevronLeftIcon />
            </Button>
            <Button onClick={handlePcInrcement}>
              {' '}
              <ChevronRightIcon />
            </Button>
            <Button onClick={() => setPC(() => program.length)}>
              {' '}
              <DoubleArrowRightIcon />
            </Button>
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <p className="text-muted-foreground">
            C = S * E * B <br />C = {S} * {E} * {B} = {C} bytes{' '}
          </p>
        </div>
        <div className="col-span-10 border-t m-2 grid grid-flow-col gap-2 overflow-y-auto pt-4">
          <div>
            <TraceView trace={program} pc={pc} s={s} b={b} word={word} />
          </div>
          <div className="border-l w-full pl-4">
            <CacheView
              sets={cache.sets}
              pc={pc}
              E={E}
              s={s}
              b={b}
              B={B}
              word={word}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
