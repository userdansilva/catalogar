/* eslint-disable react-hooks/rules-of-hooks */

"use client";

import { deleteCategoryAction } from "@/actions/delete-category-action";
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
  Archive,
  ArrowBigUpDash,
  Check,
  EllipsisVertical,
  Pencil,
  Trash,
  X,
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
    accessorKey: "isDisabled",
    header: "Ativo",
    cell: ({ row }) => {
      const isDisabled = row.getValue("isDisabled");

      return !isDisabled ? (
        <Check className="size-4" />
      ) : (
        <X className="size-4" />
      );
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
      const { id } = row.original;
      const isDisabled = row.getValue("isDisabled");

      const { executeAsync: executeToggleStatusAsync } = useAction(
        toggleCategoryStatusAction,
      );

      const { executeAsync: executeDeleteAsync } =
        useAction(deleteCategoryAction);

      const handleToggleStatus = () =>
        toast.promise(
          async () => {
            await executeToggleStatusAsync({ id });
          },
          {
            loading: "Alterando status...",
            success: "Status atualizado!",
          },
        );

      const handleRemove = () =>
        toast.promise(
          async () => {
            await executeDeleteAsync({ id });
          },
          {
            loading: "Removendo categoria...",
            success: "Categoria removida com sucesso!",
          },
        );

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>

            <DropdownMenuItem asChild>
              <Link
                href={routes.categories.sub.edit.url(id)}
                className="cursor-pointer"
              >
                <Pencil className="mr-2 size-4" />
                Editar
              </Link>
            </DropdownMenuItem>

            {!isDisabled ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Archive className="mr-2 size-4" />
                    Desativar
                  </DropdownMenuItem>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                      <Button variant="secondary">Cancelar</Button>
                    </AlertDialogCancel>

                    <AlertDialogAction asChild>
                      <Button variant="ghost" onClick={handleToggleStatus}>
                        Sim! Quero desativar
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleToggleStatus}
              >
                <ArrowBigUpDash className="mr-2 size-4 animate-bounce" />
                Ativar
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Trash className="mr-2 size-4" />
                  Excluir
                </DropdownMenuItem>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que quer remover essa categoria?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação não poderá ser desfeita. Caso queira apenas{" "}
                    <span className="font-bold">ocultar</span> essa categoria
                    dos filtros em seu catálogo você pode{" "}
                    <span className="font-bold">desativar</span>.
                  </AlertDialogDescription>
                  <AlertDialogTitle className="text-base">
                    Como desativar esse item?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Clique em{" "}
                    <span className="rounded-sm border p-2 text-xs">
                      Cancelar
                    </span>{" "}
                    e depois no botão{" "}
                    <div className="inline rounded-sm border p-2">
                      <Archive className="inline size-4" />
                    </div>
                    {" ."}
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-6">
                  <AlertDialogCancel asChild>
                    <Button variant="secondary">Cancelar</Button>
                  </AlertDialogCancel>

                  <AlertDialogAction asChild>
                    <Button variant="destructive" onClick={handleRemove}>
                      Sim! Quero remover
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
