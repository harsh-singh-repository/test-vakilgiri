import {
  ColumnDef,
  flexRender,
  getPaginationRowModel,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  totalItems: number
  pageNo: number
  pageCount: number
  onPageChange: (page: number) => void
  searchKey?: string  // Add searchKey if it's necessary
  searchValue?: string  // Add searchValue if it's necessary
}

export function ProjectTable<TData, TValue>({
  columns,
  data,
  // totalItems,
  pageNo,
  pageCount,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <ScrollArea className="p-2 w-full max-h-fit overflow-y-auto rounded-2xl shadow-lg shadow-gray-200 hide-scrollbar">
      <div className="rounded-md border bg-white mb-1">
        <Table>
          <TableHeader className="bg-blue-950 hover:bg-blue-950 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-white" key={header.id}>
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
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pageNo - 1)}
          disabled={pageNo === 1}
        >
          Previous
        </Button>
        <div className="text-sm text-gray-500">
          Page {pageNo} of {pageCount}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(pageNo + 1)}
          disabled={pageNo === pageCount}
        >
          Next
        </Button>
      </div>
    </ScrollArea>
  )
}
