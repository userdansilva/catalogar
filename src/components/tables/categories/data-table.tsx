"use client"

import { Button } from "@/components/inputs/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shadcn/components/ui/table"
import { Pagination } from "@/types/api-response"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { usePathname, useSearchParams, useRouter } from "next/navigation"

type DataTableProps<TData, TValues> = {
  columns: ColumnDef<TData, TValues>[]
  data: TData[]
  pagination: Pagination
}

export function DataTable<TData, TValues>({
  columns, data, pagination
}: DataTableProps<TData, TValues>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePagination = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page && page > 1) {
      params.set("page", page.toString())
    } else {
      params.delete("page")
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: pagination.totalPages,
    initialState: {
      pagination: {
        pageIndex: pagination.currentPage - 1,
        pageSize: pagination.perPage
      },
    },
  })

  return (
    <div>
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
                        )
                      }
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
                >
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
                  Sem resutado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          onClick={() => {
            table.previousPage();
            handlePagination(pagination.currentPage - 1)
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>

        <Button
          onClick={() => {
            table.nextPage()
            handlePagination(pagination.currentPage + 1)
          }}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}
