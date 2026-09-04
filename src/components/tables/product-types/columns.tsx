/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Check,
  CloudUpload,
  EllipsisVertical,
  EyeOff,
  Pencil,
  Trash,
  X,
} from "lucide-react";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { deleteProductTypeAction } from "@/actions/delete-product-type-action";
import { toggleProductTypeStatusAction } from "@/actions/toggle-status-product-type-action";
import type { ProductType } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { Field, FieldError } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";

export const columns: ColumnDef<ProductType>[] = [
  {
    id: "name",
    header: "Nome",
    accessorKey: "name",
  },
  {
    id: "status",
    accessorKey: "isDisabled",
    header: "Ativo",
    cell: ({ row }) => {
      const isDisabled = !!row.original.disabledAt;

      return !isDisabled ? (
        <Check className="size-4" />
      ) : (
        <X className="size-4" />
      );
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Criado em",
    cell: ({ row }) => {
      const createdAt = new Date(row.original.createdAt);

      return format(createdAt, "dd/MM/yyyy", {
        locale: ptBR,
      });
    },
  },
  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    header: "Atualizado em",
    cell: ({ row }) => {
      const updatedAt = new Date(row.original.updatedAt);

      return format(updatedAt, "dd/MM/yyyy", {
        locale: ptBR,
      });
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const isDisabled = !!row.original.disabledAt;
      const { id } = row.original;

      const schema = z.object({
        confirm: z
          .string()
          .min(1, "Campo obrigatório")
          .refine((s) => s === "DELETAR", {
            message: "Digite DELETAR para confirmar.",
          }),
      });

      const [deleteAlertDialogOpen, setDeleteAlertDialogOpen] = useState(false);
      const [hideAlertDialogOpen, setHideAlertDialogOpen] = useState(false);

      const form = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
          confirm: "",
        },
      });

      const { executeAsync: executeToggleStatusAsync } = useAction(
        toggleProductTypeStatusAction,
      );

      const { executeAsync: executeDeleteAsync } = useAction(
        deleteProductTypeAction,
      );

      const handleToggleStatus = () => {
        const promise = new Promise<void>((res, rej) => {
          executeToggleStatusAsync({
            id,
            isDisabled: !row.original.disabledAt,
          }).then((result) => {
            if (result.serverError) {
              rej(result.serverError.message);
            }

            res();
          });
        });

        toast.promise(promise, {
          loading: "Alterando status...",
          success: "Status alterado!",
          error: (res) => res,
        });
      };

      const handleRemove = () => {
        const promise = new Promise<void>((res, rej) => {
          executeDeleteAsync({ id }).then((result) => {
            if (result.serverError) {
              rej(result.serverError.message);
            }

            res();
          });
        });

        toast.promise(promise, {
          loading: "Deletando tipo de produto...",
          success: () => {
            form.reset({
              confirm: "",
            });
            return "Tipo de produto deletado!";
          },
          error: "Ocorreu uma falha ao deletar tipo de produto",
        });
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon">
                  <EllipsisVertical />
                </Button>
              }
            />

            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Ações</DropdownMenuLabel>

                <DropdownMenuItem
                  render={
                    <Link
                      href={routes.productTypes.sub.edit.url(id)}
                      className="cursor-pointer"
                    >
                      <Pencil className="mr-2 size-4" />
                      Editar
                    </Link>
                  }
                />

                {!isDisabled ? (
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setHideAlertDialogOpen(true)}
                  >
                    <EyeOff className="mr-2 size-4" />
                    Ocultar
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleToggleStatus}
                  >
                    <CloudUpload className="mr-2 size-4" />
                    Ativar
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setDeleteAlertDialogOpen(true)}
                >
                  <Trash className="mr-2 size-4" />
                  Deletar
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/** Hide Alert Dialog */}
          <AlertDialog
            open={hideAlertDialogOpen}
            onOpenChange={setHideAlertDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que quer ocultar esse tipo de produto?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  Ao ocultar o tipo de produto, os itens vinculados a ele NÃO
                  seram exibidos no seu catálogo. Você pode voltar a exibir a
                  qualquer momento clicando em{" "}
                  <span className="inline rounded-sm border px-2 py-1 text-xs text-nowrap">
                    <CloudUpload className="-mt-1 mr-1 inline size-4" />
                    Ativar
                  </span>
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Cancelar
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={() => {
                    handleToggleStatus();
                    setHideAlertDialogOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  Sim! Quero ocultar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/** Delete Alert Dialog */}
          <AlertDialog
            open={deleteAlertDialogOpen}
            onOpenChange={setDeleteAlertDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que quer deletar esse tipo de produto?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não poderá ser desfeita e{" "}
                  <span className="font-bold">
                    vai deletar todos os itens de catálogo vinculados a esse
                    tipo de produto
                  </span>
                  {". "}
                  Caso queira apenas <span className="font-bold">
                    ocultar
                  </span>{" "}
                  temporariamente essses itens vinculados você pode clicar em{" "}
                  <span className="inline rounded-sm border px-2 py-1 text-xs">
                    <EyeOff className="-mt-1 mr-1 inline size-4" />
                    Ocultar
                  </span>
                </AlertDialogDescription>
              </AlertDialogHeader>

              <Controller
                name="confirm"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite DELETAR"
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck="false"
                      disabled={form.formState.isSubmitting}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>

                <AlertDialogAction
                  variant="destructive"
                  onClick={form.handleSubmit(() => {
                    handleRemove();
                    setDeleteAlertDialogOpen(false);
                  })}
                >
                  Sim! Quero deletar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
