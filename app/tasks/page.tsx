"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export type Task = {
  id: string
  name: string
  category: "direct" | "investment"
  duration: number
  cost: number
  currentRevenue: number
  potentialRevenue: number
  completionDate: string
  revenueDate: string | null
  roi: number | null
}

const data: Task[] = [
  {
    id: "1",
    name: "Izrada logotipa za klijenta X",
    category: "direct",
    duration: 8,
    cost: 0,
    currentRevenue: 300,
    potentialRevenue: 0,
    completionDate: "2023-10-12",
    revenueDate: "2023-10-15",
    roi: 37.5,
  },
  {
    id: "2",
    name: "SEO optimizacija za web shop",
    category: "investment",
    duration: 12,
    cost: 50,
    currentRevenue: 0,
    potentialRevenue: 1200,
    completionDate: "2023-09-28",
    revenueDate: "2023-11-15",
    roi: 95.83,
  },
  {
    id: "3",
    name: "Dizajn web stranice",
    category: "direct",
    duration: 24,
    cost: 0,
    currentRevenue: 1200,
    potentialRevenue: 0,
    completionDate: "2023-10-05",
    revenueDate: "2023-10-10",
    roi: 50,
  },
  {
    id: "4",
    name: "Pisanje blog članka",
    category: "direct",
    duration: 6,
    cost: 0,
    currentRevenue: 150,
    potentialRevenue: 0,
    completionDate: "2023-10-18",
    revenueDate: "2023-10-20",
    roi: 25,
  },
  {
    id: "5",
    name: "Facebook kampanja za klijenta Y",
    category: "investment",
    duration: 10,
    cost: 200,
    currentRevenue: 0,
    potentialRevenue: 800,
    completionDate: "2023-10-01",
    revenueDate: null,
    roi: null,
  },
  {
    id: "6",
    name: "UX istraživanje za mobilnu aplikaciju",
    category: "investment",
    duration: 18,
    cost: 100,
    currentRevenue: 0,
    potentialRevenue: 2500,
    completionDate: "2023-09-15",
    revenueDate: "2023-10-30",
    roi: 133.33,
  },
  {
    id: "7",
    name: "Izrada prezentacije za sastanak",
    category: "direct",
    duration: 4,
    cost: 0,
    currentRevenue: 100,
    potentialRevenue: 0,
    completionDate: "2023-10-20",
    revenueDate: "2023-10-21",
    roi: 25,
  },
  {
    id: "8",
    name: "Video montaža za YouTube",
    category: "direct",
    duration: 14,
    cost: 50,
    currentRevenue: 450,
    potentialRevenue: 0,
    completionDate: "2023-10-08",
    revenueDate: "2023-10-12",
    roi: 28.57,
  },
  {
    id: "9",
    name: "Razvoj backend funkcionalnosti",
    category: "investment",
    duration: 30,
    cost: 0,
    currentRevenue: 0,
    potentialRevenue: 3000,
    completionDate: "2023-09-30",
    revenueDate: null,
    roi: null,
  },
  {
    id: "10",
    name: "Kreiranje e-mail newslettera",
    category: "direct",
    duration: 5,
    cost: 20,
    currentRevenue: 180,
    potentialRevenue: 0,
    completionDate: "2023-10-15",
    revenueDate: "2023-10-16",
    roi: 32,
  },
]

export default function TasksPage() {
  const router = useRouter()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const columns: ColumnDef<Task>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Naziv Zadatka",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "category",
      header: "Kategorija",
      cell: ({ row }) => {
        const category = row.getValue("category") as string
        return (
          <Badge variant={category === "direct" ? "default" : "secondary"}>
            {category === "direct" ? "Direktno naplativo" : "Investicija"}
          </Badge>
        )
      },
    },
    {
      accessorKey: "duration",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Trajanje (h)
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-center">{row.getValue("duration")}</div>,
    },
    {
      accessorKey: "cost",
      header: () => <div className="text-right">Trošak (€)</div>,
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("cost"))
        return <div className="text-right font-medium">{amount.toFixed(2)}</div>
      },
    },
    {
      accessorKey: "currentRevenue",
      header: () => <div className="text-right">Trenutna zarada (€)</div>,
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("currentRevenue"))
        return <div className="text-right font-medium">{amount.toFixed(2)}</div>
      },
    },
    {
      accessorKey: "potentialRevenue",
      header: () => <div className="text-right">Potencijalna zarada (€)</div>,
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("potentialRevenue"))
        return <div className="text-right font-medium">{amount.toFixed(2)}</div>
      },
    },
    {
      accessorKey: "roi",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full justify-end"
          >
            ROI (€/h)
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const roi = row.getValue("roi") as number | null
        return <div className="text-right font-medium">{roi !== null ? roi.toFixed(2) : "N/A"}</div>
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const task = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Otvori meni</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Akcije</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => router.push(`/tasks/${task.id}`)}>Pregledaj detalje</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/tasks/${task.id}/edit`)}>Uredi zadatak</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  // Handle task delete
                  console.log(`Delete task: ${task.id}`)
                }}
                className="text-destructive focus:text-destructive"
              >
                Obriši zadatak
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Zadaci</h1>
        <Link href="/tasks/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Novi Zadatak
          </Button>
        </Link>
      </div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtriraj zadatke..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Kategorija <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => table.getColumn("category")?.setFilterValue(null)}>
              Sve kategorije
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => table.getColumn("category")?.setFilterValue("direct")}>
              Direktno naplativo
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => table.getColumn("category")?.setFilterValue("investment")}>
              Investicija
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-2">
              Kolone <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id === "name"
                      ? "Naziv Zadatka"
                      : column.id === "category"
                        ? "Kategorija"
                        : column.id === "duration"
                          ? "Trajanje"
                          : column.id === "cost"
                            ? "Trošak"
                            : column.id === "currentRevenue"
                              ? "Trenutna zarada"
                              : column.id === "potentialRevenue"
                                ? "Potencijalna zarada"
                                : column.id === "roi"
                                  ? "ROI"
                                  : column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nema rezultata.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} od {table.getFilteredRowModel().rows.length} redova
          odabrano.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prethodna
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Sljedeća
          </Button>
        </div>
      </div>
    </div>
  )
}

