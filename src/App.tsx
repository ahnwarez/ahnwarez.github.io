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
        <div className="grid grid-cols-2 gap-4">
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
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div id="controls" className="space-x-4 flex justify-end">
            <Button variant="default" className="space-x-2">
              <PlayIcon /> <p>Play</p>
            </Button>
            <Button variant="default" className="space-x-2">
              <RewindIcon /> <p>Rewind</p>
            </Button>
          </div>

          <div id="addresses" className="col-start-1 overflow-auto h-48">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{''}</TableHead>
                  <TableHead>Inst.</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Tag</TableHead>
                  <TableHead>Set Index</TableHead>
                  <TableHead>B</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-foreground size-8"> →</TableCell>
                  <TableCell> L</TableCell>
                  <TableCell className="text-right">0x54C</TableCell>
                  <TableCell className="text-amber-600">0000</TableCell>
                  <TableCell className="text-green-600">1000</TableCell>
                  <TableCell className="text-zinc-600">1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-foreground size-8"> →</TableCell>
                  <TableCell> L</TableCell>
                  <TableCell className="text-right">0x54C</TableCell>
                  <TableCell className="text-amber-600">0000</TableCell>
                  <TableCell className="text-green-600">1000</TableCell>
                  <TableCell className="text-zinc-600">1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-foreground size-8"> →</TableCell>
                  <TableCell> L</TableCell>
                  <TableCell className="text-right">0x54C</TableCell>
                  <TableCell className="text-amber-600">0000</TableCell>
                  <TableCell className="text-green-600">1000</TableCell>
                  <TableCell className="text-zinc-600">1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-foreground size-8"> →</TableCell>
                  <TableCell> L</TableCell>
                  <TableCell className="text-right">0x54C</TableCell>
                  <TableCell className="text-amber-600">0000</TableCell>
                  <TableCell className="text-green-600">1000</TableCell>
                  <TableCell className="text-zinc-600">1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-foreground size-8"> →</TableCell>
                  <TableCell> L</TableCell>
                  <TableCell className="text-right">0x54C</TableCell>
                  <TableCell className="text-amber-600">0000</TableCell>
                  <TableCell className="text-green-600">1000</TableCell>
                  <TableCell className="text-zinc-600">1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-foreground size-8"> →</TableCell>
                  <TableCell> L</TableCell>
                  <TableCell className="text-right">0x54C</TableCell>
                  <TableCell className="text-amber-600">0000</TableCell>
                  <TableCell className="text-green-600">1000</TableCell>
                  <TableCell className="text-zinc-600">1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-foreground size-8"> →</TableCell>
                  <TableCell> L</TableCell>
                  <TableCell className="text-right">0x54C</TableCell>
                  <TableCell className="text-amber-600">0000</TableCell>
                  <TableCell className="text-green-600">1000</TableCell>
                  <TableCell className="text-zinc-600">1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-foreground size-8"> →</TableCell>
                  <TableCell> L</TableCell>
                  <TableCell className="text-right">0x54C</TableCell>
                  <TableCell className="text-amber-600">0000</TableCell>
                  <TableCell className="text-green-600">1000</TableCell>
                  <TableCell className="text-zinc-600">1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-foreground size-8"> →</TableCell>
                  <TableCell> L</TableCell>
                  <TableCell className="text-right">0x54C</TableCell>
                  <TableCell className="text-amber-600">0000</TableCell>
                  <TableCell className="text-green-600">1000</TableCell>
                  <TableCell className="text-zinc-600">1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-foreground size-8"> →</TableCell>
                  <TableCell> L</TableCell>
                  <TableCell className="text-right">0x54C</TableCell>
                  <TableCell className="text-amber-600">0000</TableCell>
                  <TableCell className="text-green-600">1000</TableCell>
                  <TableCell className="text-zinc-600">1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-foreground size-8"> →</TableCell>
                  <TableCell> L</TableCell>
                  <TableCell className="text-right">0x54C</TableCell>
                  <TableCell className="text-amber-600">0000</TableCell>
                  <TableCell className="text-green-600">1000</TableCell>
                  <TableCell className="text-zinc-600">1111</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div id="sets" className="space-y-2 overflow-auto h-48">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Set Index</TableHead>
                  <TableHead className="w-10">Valid</TableHead>
                  <TableHead>Tag</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-green-600">0000</TableCell>
                  <TableCell className="text-pink-600">1</TableCell>
                  <TableCell className="text-amber-600">1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-green-600">0000</TableCell>
                  <TableCell className="text-pink-600">1</TableCell>
                  <TableCell className="text-amber-600">1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-green-600">0000</TableCell>
                  <TableCell className="text-pink-600">1</TableCell>
                  <TableCell className="text-amber-600">1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-green-600">0000</TableCell>
                  <TableCell className="text-pink-600">1</TableCell>
                  <TableCell className="text-amber-600">1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-green-600">0000</TableCell>
                  <TableCell className="text-pink-600">1</TableCell>
                  <TableCell className="text-amber-600">1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-green-600">0000</TableCell>
                  <TableCell className="text-pink-600">1</TableCell>
                  <TableCell className="text-amber-600">1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-green-600">0000</TableCell>
                  <TableCell className="text-pink-600">1</TableCell>
                  <TableCell className="text-amber-600">1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-green-600">0000</TableCell>
                  <TableCell className="text-pink-600">1</TableCell>
                  <TableCell className="text-amber-600">1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-green-600">0000</TableCell>
                  <TableCell className="text-pink-600">1</TableCell>
                  <TableCell className="text-amber-600">1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-green-600">0000</TableCell>
                  <TableCell className="text-pink-600">1</TableCell>
                  <TableCell className="text-amber-600">1111</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-green-600">0000</TableCell>
                  <TableCell className="text-pink-600">1</TableCell>
                  <TableCell className="text-amber-600">1111</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
