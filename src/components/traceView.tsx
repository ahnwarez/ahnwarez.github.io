import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

interface TraceProps {
  pc: number
  word: number
  s: number
  b: number
  trace: Array<{
    address: number
    instruction: string
    tag: bigint
    setIndex: bigint
    B: bigint
  }>
}

export function TraceView({ s, b, pc, word, trace }: TraceProps) {
  return (
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
  )
}
