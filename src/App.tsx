import { Button } from './components/ui/button'
import { Slider } from './components/ui/slider'
import { Input } from './components/ui/input'
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
import { PlayIcon, RewindIcon } from 'lucide-react'

export function App() {
  return (
    <div className="p-4">
      <div className="flex flex-col gap-y-4">
        <div className="space-y-4">
          <div className="space-x-4">
            <Button variant="link">yi.trace</Button>
            <Button variant="link">yi2.trace</Button>
            <Button variant="link">trans.trace</Button>
            <Button variant="link">dave.trace</Button>
          </div>
          <Input type="file" />
        </div>
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
                <pre>
                  <code>C = S * E * B = 16 bytes</code>
                </pre>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-y-1">
              <div className="flex justify-between">
                <label>s</label>
                <p>4</p>
              </div>
              <Slider step={1} min={1} max={10} defaultValue={[4]} />
            </div>
            <div className="flex flex-col gap-y-1">
              <div className="flex justify-between">
                <label>E</label>
                <p>1</p>
              </div>
              <Slider step={1} min={1} max={10} defaultValue={[1]} />
            </div>
            <div className="flex flex-col gap-y-1">
              <div className="flex justify-between">
                <label>b</label>
                <p>4</p>
              </div>
              <Slider step={1} min={1} max={10} defaultValue={[4]} />
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-2 gap-4">
          <div id="controls" className="space-x-4 flex justify-end">
            <Button variant="default" className="space-x-2">
              <PlayIcon /> <p>Play</p>
            </Button>
            <Button variant="default" className="space-x-2">
              <RewindIcon /> <p>Rewind</p>
            </Button>
          </div>

          <div id="addresses" className="col-start-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{''}</TableHead>
                  <TableHead>Inst.</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Tag</TableHead>
                  <TableHead>SI</TableHead>
                  <TableHead>B</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-zinc-600 size-8"> →</TableCell>
                  <TableCell className="text-zinc-600"> L</TableCell>
                  <TableCell className="text-zinc-600 text-right">
                    0x54C
                  </TableCell>
                  <TableCell className="text-amber-600">0000</TableCell>
                  <TableCell className="text-green-600">1000</TableCell>
                  <TableCell className="text-zinc-600">1111</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div id="sets" className="space-y-2 ">
            <Card id="set">
              <CardContent className="p-4 flex items-center gap-x-4">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
