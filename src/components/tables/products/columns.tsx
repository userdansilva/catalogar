/* eslint-disable react-hooks/rules-of-hooks */

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Archive,
  ArrowBigUpDash, Check, EllipsisVertical, Pencil, Trash, X,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import { Button } from "@/shadcn/components/ui/button";
import { routes } from "@/routes";
import { Product } from "@/types/api-types";
import { toggleProductStatusAction } from "@/actions/toggle-status-product-action";

export const columns: ColumnDef<Product>[] = [
  {
    header: "Nome",
    accessorKey: "name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "isDisabled",
    header: "Ativo",
    cell: ({ row }) => {
      const isDisabled = row.getValue("isDisabled");

      return !isDisabled
        ? <Check className="size-4" />
        : <X className="size-4" />;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt"));
      return format(createdAt, "dd/MM/yyyy", {
        locale: ptBR,
      });
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Atualizado em",
    cell: ({ row }) => {
      const updatedAt = new Date(row.getValue("updatedAt"));
      return format(updatedAt, "dd/MM/yyyy", {
        locale: ptBR,
      });
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { executeAsync } = useAction(toggleProductStatusAction);

      const toggleStatus = (productId: string) => toast.promise(async () => {
        await executeAsync({ id: productId });
      }, {
        loading: "Alterando status...",
        success: "Status atualizado!",
      });

      const { id } = row.original;
      const isDisabled = row.getValue("isDisabled");

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
                href={routes.products.sub.edit.url(id)}
                className="cursor-pointer"
              >
                <Pencil className="mr-2 size-4" />
                Editar
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="cursor-pointer">
              {!isDisabled ? (
                <Link
                  href={routes.products.sub.disable.url(id)}
                  className="cursor-pointer"
                >
                  <Archive className="mr-2 size-4" />
                  Desativar
                </Link>
              ) : (
                <button className="w-full" onClick={() => toggleStatus(id)} type="button">
                  <ArrowBigUpDash className="mr-2 size-4 animate-bounce" />
                  Ativar
                </button>
              )}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              asChild
              className="cursor-pointer"
            >
              <Link href={routes.products.sub.delete.url(id)}>
                <Trash className="mr-2 size-4" />
                Excluir
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
