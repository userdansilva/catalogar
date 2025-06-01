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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/components/ui/alert-dialog";
import { ProductType } from "@/types/api-types";
import { toggleProductTypeStatusAction } from "@/actions/toggle-status-product-type-action";
import { deleteProductTypeAction } from "@/actions/delete-product-type-action";
import {
  Form, FormControl, FormField, FormItem, FormMessage,
} from "@/shadcn/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shadcn/components/ui/input";
import { useState } from "react";

export const columns: ColumnDef<ProductType>[] = [
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
      const { id } = row.original;
      const isDisabled = row.getValue("isDisabled");

      const schema = z.object({
        confirm: z.string()
          .min(1, "Campo obrigatório")
          .refine((val) => val === "REMOVER", {
            message: "Digite REMOVER para confirmar.",
          }),
      });

      const [open, setOpen] = useState(false);

      const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
          confirm: "" as "REMOVER",
        },
      });

      const {
        executeAsync: executeToggleStatusAsync,
      } = useAction(toggleProductTypeStatusAction);

      const {
        executeAsync: executeDeleteAsync,
      } = useAction(deleteProductTypeAction);

      const handleToggleStatus = () => toast.promise(async () => {
        await executeToggleStatusAsync({ id });
      }, {
        loading: "Alterando status...",
        success: "Status atualizado!",
      });

      const handleRemove = () => toast.promise(async () => {
        await executeDeleteAsync({ id });
      }, {
        loading: "Removendo produto...",
        success: "Tipo de produto removido com sucesso!",
      });

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
                href={routes.productTypes.sub.edit.url(id)}
                className="cursor-pointer"
              >
                <Pencil className="mr-2 size-4" />
                Editar
              </Link>
            </DropdownMenuItem>

            {!isDisabled ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
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
                      This action cannot be undone. This will permanently delete your
                      account and remove your data from our servers.
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
              <DropdownMenuItem className="cursor-pointer" onClick={handleToggleStatus}>
                <ArrowBigUpDash className="mr-2 size-4 animate-bounce" />
                Ativar
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            <AlertDialog open={open} onOpenChange={setOpen}>
              <Form {...form}>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                    <Trash className="mr-2 size-4" />
                    Excluir
                  </DropdownMenuItem>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Tem certeza que quer remover esse produto?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Essa ação não poderá ser desfeita e
                      {" "}
                      <span className="font-bold uppercase text-destructive">
                        vai remover todos os itens de
                        catálogo vinculados a esse produto
                      </span>
                      {". "}
                      Caso queira apenas
                      {" "}
                      <span className="font-bold">
                        ocultar
                      </span>
                      {" "}
                      os itens de catálogo vinculados a esse produto
                      você pode
                      {" "}
                      <span className="font-bold">
                        desativar
                      </span>
                      esse produto.
                    </AlertDialogDescription>
                    <AlertDialogTitle className="text-base">
                      Como desativar esse produto?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Clique em
                      {" "}
                      <span className="rounded-sm border p-2 text-xs">
                        Cancelar
                      </span>
                      {" "}
                      e depois no botão
                      {" "}
                      <span className="inline rounded-sm border p-2">
                        <Archive className="inline size-4" />
                      </span>
                      {" ."}
                    </AlertDialogDescription>

                    <AlertDialogTitle className="text-base">
                      Quer seguir com a remoção?
                    </AlertDialogTitle>

                    <AlertDialogDescription className="mb-3">
                      Digite REMOVER abaixo e clique em &quot;Sim! Quero remover&quot;
                    </AlertDialogDescription>

                    <FormField
                      name="confirm"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Digite REMOVER"
                              autoComplete="off"
                              autoCorrect="off"
                              spellCheck="false"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AlertDialogHeader>

                  <AlertDialogFooter className="mt-6">
                    <AlertDialogCancel asChild>
                      <Button variant="secondary">Cancelar</Button>
                    </AlertDialogCancel>

                    <Button
                      variant="destructive"
                      onClick={form.handleSubmit(() => {
                        handleRemove();
                        setOpen(false);
                      })}
                    >
                      Sim! Quero remover
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </Form>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
