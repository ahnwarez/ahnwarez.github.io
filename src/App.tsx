import { Button } from './components/ui/button'
import { Slider } from './components/ui/slider'
import { Label } from './components/ui/label'
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group'

import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { useState } from 'react'
import { TraceView } from './components/traceView'
import { CacheView } from './components/cacheView'
import { getTrace, parse } from './traces'

export function App() {
  const [selectedExample, setSelectedExample] = useState('yi2')
  const [word, setWord] = useState(16)
  const [s, setS] = useState(4)
  const [E, setE] = useState(1)
  const [b, setb] = useState(4)
  const [pc, setPC] = useState(0)

  const trace = parse(s, b, getTrace(selectedExample))

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
                  {s}
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
                  {E}
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
                  {b}
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
              <CardContent className="text-muted-foreground">
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
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <div>
          <TraceView trace={trace} pc={pc} s={s} b={b} word={word} />
          <CacheView
            trace={trace}
            filename={selectedExample}
            E={E}
            s={s}
            b={b}
            B={B}
            word={word}
          />
        </div>
      </div>
    </div>
  )
}
