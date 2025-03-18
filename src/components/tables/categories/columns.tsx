"use client"

import { routes } from "@/routes";
import { Badge } from "@/shadcn/components/ui/badge";
import { Button } from "@/shadcn/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shadcn/components/ui/dropdown-menu";
import { Category } from "@/types/api-types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns"
import { ptBR } from "date-fns/locale";
import { Archive, Check, EllipsisVertical, Pencil, Trash, X } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Category>[] = [
  {
    header: "Preview",
    accessorKey: "textColor",
    cell: ({ row }) => {
      const { name, textColor, backgroundColor } = row.original

      return (
        <Badge
          style={{
            color: textColor,
            background: backgroundColor
          }}>
          {name}
        </Badge>
      )
    }
  },
  {
    accessorKey: "slug",
    header: "Slug"
  },
  {
    accessorKey: "isDisabled",
    header: "Ativo",
    cell: ({ row }) => {
      const isDisabled = row.getValue("isDisabled")

      return !isDisabled
        ? <Check className="size-4" />
        : <X className="size-4" />
    }
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt"))
      return format(createdAt, "dd/MM/yyyy", {
        locale: ptBR
      })
    }
  },
  {
    accessorKey: "updatedAt",
    header: "Atualizado em",
    cell: ({ row }) => {
      const updatedAt = new Date(row.getValue("updatedAt"))
      return format(updatedAt, "dd/MM/yyyy", {
        locale: ptBR
      })
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              Ações
            </DropdownMenuLabel>

            <DropdownMenuItem asChild>
              <Link
                href={routes.category.edit(id)}
                className="cursor-pointer"
              >
                <Pencil className="size-4 mr-2" />
                Editar
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href={routes.category.disable(id)}
                className="cursor-pointer"
              >
                <Archive className="size-4 mr-2" />
                Desativar
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link
                href={routes.category.delete(id)}
                className="cursor-pointer"
              >
                <Trash className="size-4 mr-2" />
                Excluir
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
