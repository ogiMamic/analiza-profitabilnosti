import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function RecentTasks() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Zadatak</TableHead>
          <TableHead>Kategorija</TableHead>
          <TableHead>Datum</TableHead>
          <TableHead className="text-right">Zarada</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Izrada logotipa za klijenta X</TableCell>
          <TableCell>
            <Badge>Direktno naplativo</Badge>
          </TableCell>
          <TableCell>12.10.2023.</TableCell>
          <TableCell className="text-right">€300.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Kreiranje e-mail newslettera</TableCell>
          <TableCell>
            <Badge>Direktno naplativo</Badge>
          </TableCell>
          <TableCell>15.10.2023.</TableCell>
          <TableCell className="text-right">€180.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Pisanje blog članka</TableCell>
          <TableCell>
            <Badge>Direktno naplativo</Badge>
          </TableCell>
          <TableCell>18.10.2023.</TableCell>
          <TableCell className="text-right">€150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Izrada prezentacije za sastanak</TableCell>
          <TableCell>
            <Badge>Direktno naplativo</Badge>
          </TableCell>
          <TableCell>20.10.2023.</TableCell>
          <TableCell className="text-right">€100.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Facebook kampanja za klijenta Y</TableCell>
          <TableCell>
            <Badge variant="secondary">Investicija</Badge>
          </TableCell>
          <TableCell>01.10.2023.</TableCell>
          <TableCell className="text-right">€0.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

