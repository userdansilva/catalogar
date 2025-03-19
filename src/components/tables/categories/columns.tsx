/* eslint-disable react-hooks/rules-of-hooks */

"use client";

import { toggleCategoryStatusAction } from "@/actions/toggle-status-category-action";
import { routes } from "@/routes";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/components/ui/alert-dialog";
import { Badge } from "@/shadcn/components/ui/badge";
import { Button } from "@/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import { Category } from "@/types/api-types";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Archive, ArrowBigUpDash, Check, EllipsisVertical, Pencil, Trash, X,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { toast } from "sonner";

export const columns: ColumnDef<Category>[] = [
  {
    header: "Preview",
    accessorKey: "textColor",
    cell: ({ row }) => {
      const { name, textColor, backgroundColor } = row.original;

      return (
        <Badge
          style={{
            color: textColor,
            background: backgroundColor,
          }}
        >
          {name}
        </Badge>
      );
    },
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
      const { executeAsync } = useAction(toggleCategoryStatusAction);

      const toggleStatus = (categoryId: string) => toast.promise(async () => {
        await executeAsync({ id: categoryId });
      }, {
        loading: "Alterando status...",
        success: "Status atualizado!",
      });

      const { id } = row.original;
      const isDisabled = row.getValue("isDisabled");

      return (
        <AlertDialog>
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

              <DropdownMenuItem asChild className="cursor-pointer">
                {!isDisabled ? (
                  <AlertDialogTrigger>
                    <Archive className="size-4 mr-2" />
                    Desativar
                  </AlertDialogTrigger>
                ) : (
                  <button className="w-full" onClick={() => toggleStatus(id)} type="button">
                    <ArrowBigUpDash className="size-4 mr-2 animate-bounce" />
                    Ativar
                  </button>
                )}
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                asChild
                className="cursor-pointer"
              >
                <Link href={routes.category.delete(id)}>
                  <Trash className="size-4 mr-2" />
                  Excluir
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you absolutely sure?
              </AlertDialogTitle>

              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="secondary">Cancelar</Button>
              </AlertDialogCancel>

              <AlertDialogAction asChild>
                <Button variant="ghost" onClick={() => toggleStatus(id)}>
                  Sim! Quero desativar
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
