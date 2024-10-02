"use client"

import { CaretSortIcon } from "@radix-ui/react-icons"
import { Column, ColumnDef, ColumnFiltersState, Row, SortingState, VisibilityState, flexRender, getCoreRowModel,
  getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"


// 型定義
export type SelectTableDataItem = {
  [key: string]: number | string
}
export type ColumnName = {
  key: string
  type: 'string' | 'number'
  name: string
}
export type SelectTableProps = {
  tableData: SelectTableDataItem[]
  columnNames: ColumnName[]
  initialCheckNumber?: number
  setFilteredData: (data: SelectTableDataItem[]) => void
}

// チェックボックス列
const selectColumn: ColumnDef<SelectTableDataItem> = {
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
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
}

// セレクトテーブル
const SelectTable: React.FC<SelectTableProps> = ({
  tableData,
  columnNames,
  initialCheckNumber,
  setFilteredData,
}: SelectTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState<{[key in number]: boolean}>({})

  useEffect(() => {
    if(initialCheckNumber && initialCheckNumber > 0){
      const initialRowSelection: {[key in number]: boolean} = [
        ...Array(initialCheckNumber).keys()
        ].reduce((acc, curr) => {
          return {
            ...acc,
            [curr]: true
          }
        }, {})
      setRowSelection(initialRowSelection)
    }
  },[])
  useEffect(() => {
    const filteredItems = tableData.filter((_elem, index) => {
      return rowSelection[index]
    })
    setFilteredData(filteredItems)
  },[rowSelection])

  const columns: ColumnDef<SelectTableDataItem>[] = [
    selectColumn,
    ...columnNames.map((elem) => {
      return ({
          accessorKey: elem.key,
          header: ({ column }: { column: Column<SelectTableDataItem, unknown>}) => {
            return (
              <Button
                variant="ghost"
                className={`${elem.type === 'number' ?? 'hidden lg:flex'}`}
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                {elem.name}
                <CaretSortIcon className="ml-2 h-4 w-4" />
              </Button>
            )
          },
          cell: ({ row }: { row: Row<SelectTableDataItem>}) => <div className={
            `lowercase ${elem.type === 'number' ? 'text-right hidden lg:block' : 'text-left'}`
          }>{row.getValue(elem.key)}</div>,
        })
    })
  ]

  const table = useReactTable<SelectTableDataItem>({
    data: tableData,
    columns: columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  return (
    <>
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder={`${columnNames[0].name} を 検索...`}
          value={(table.getColumn(columnNames[0].key)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(columnNames[0].key)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="h-10"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
    </>
  )
}
export default SelectTable
