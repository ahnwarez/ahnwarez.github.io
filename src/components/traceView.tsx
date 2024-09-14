import { parse } from '../program'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

interface TraceProps {
  pc: number
  word: number
  s: number
  b: number
  trace: ReturnType<typeof parse>
}

export function TraceView({ s, b, pc, word, trace }: TraceProps) {
  const summary = trace.reduce(
    (acc, v) => ({
      hits: acc.hits + v.hit,
      misses: acc.misses + v.miss,
      evictions: acc.evictions + v.eviction,
    }),
    { hits: 0, misses: 0, evictions: 0 },
  )
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{''}</TableHead>
          <TableHead>Inst.</TableHead>
          <TableHead>Adrs.</TableHead>
          <TableHead>Adrs.</TableHead>
          <TableHead>Hits</TableHead>
          <TableHead>Misses</TableHead>
          <TableHead>Evictions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="font-mono">
        {trace.map((t, i) => (
          <TableRow
            key={t.i}
            className={i === pc ? 'font-extrabold' : 'font-normal'}
          >
            <TableCell className="text-foreground size-8">
              {i === pc ? '→' : ''}
            </TableCell>
            <TableCell> {t.instruction}</TableCell>
            <TableCell className="text-right">
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
            <TableCell className="text-center"> {t.hit > 0 && '●'}</TableCell>
            <TableCell className="text-center"> {t.miss > 0 && '●'}</TableCell>
            <TableCell className="text-center">
              {' '}
              {t.eviction > 0 && '●'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="text-foreground size-8">
            {trace.length === pc ? '→' : ''}
          </TableCell>
          <TableCell className="text-zinc-600">END</TableCell>
          <TableCell className="text-zinc-600"></TableCell>
          <TableCell className="text-zinc-600 text-right">TOTAL</TableCell>
          <TableCell className="text-foreground">{summary.hits}</TableCell>
          <TableCell className="text-foreground">{summary.misses}</TableCell>
          <TableCell className="text-foreground">{summary.evictions}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
