import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
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
          {/* Dodajte ostale redove iz originalnog koda */}
        </TableBody>
      </Table>
    )
  }