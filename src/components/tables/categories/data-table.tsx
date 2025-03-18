"use client"

import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/shadcn/components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shadcn/components/ui/table"
import { Pagination as TPagination } from "@/types/api-response"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { usePathname, useSearchParams } from "next/navigation"

type DataTableProps<TData, TValues> = {
  columns: ColumnDef<TData, TValues>[]
  data: TData[]
  pagination: TPagination
}

export function DataTable<TData, TValues>({
  columns, data, pagination
}: DataTableProps<TData, TValues>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getPaginatedUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);

    if (page && page > 1) {
      params.set("page", page.toString())
    } else {
      params.delete("page")
    }

    return `${pathname}?${params.toString()}`;
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
    <div className="space-y-6">
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

      <Pagination className="justify-end">
        <PaginationContent>
          {table.getCanPreviousPage() && (
            <PaginationItem>
              <PaginationPrevious
                href={getPaginatedUrl(pagination.currentPage - 1)}
              />
            </PaginationItem>
          )}

          {table.getCanNextPage() && (
            <PaginationItem>
              <PaginationNext
                href={getPaginatedUrl(pagination.currentPage + 1)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}
