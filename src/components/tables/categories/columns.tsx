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
import { Badge } from "@/components/ui/badge";
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
import z from "zod";
import { deleteCategoryAction } from "@/actions/delete-category-action";
import { toggleCategoryStatusAction } from "@/actions/toggle-status-category-action";
import type { Category } from "@/generated/prisma/client";
import { routes } from "@/routes";
import { toast } from "@/components/ui/toast";
import { Field, FieldError } from "@/components/ui/field";

export const columns: ColumnDef<Category>[] = [
  {
    id: "preview",
    header: "Preview",
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

      const [dropdownOpen, setDropdownOpen] = useState(false);

      const form = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
        defaultValues: {
          confirm: "",
        },
      });

      const { executeAsync: executeToggleStatusAsync } = useAction(
        toggleCategoryStatusAction,
      );

      const { executeAsync: executeDeleteAsync } =
        useAction(deleteCategoryAction);

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

            form.reset();
            res();
          });
        });

        toast.promise(promise, {
          loading: "Deletando categoria...",
          success: () => {
            form.reset({
              confirm: "",
            });
            return "Categoria deletada!";
          },
          error: (res) => res,
        });
      };

      return (
        <>
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger
              render={<Button variant="ghost" size="icon" />}
            >
              <EllipsisVertical />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Ações</DropdownMenuLabel>

                <DropdownMenuItem
                  render={
                    <Link
                      href={routes.categories.sub.edit.url(id)}
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
                  Tem certeza que quer ocultar essa categoria?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  Ao ocultar a categoria, os itens vinculados a ela (que não
                  possui outra categoria ativa), NÃO seram exibidos no seu
                  catálogo. Você pode voltar a exibir a qualquer momento
                  clicando em{" "}
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
                  Tem certeza que quer deletar essa categoria?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não poderá ser desfeita. Caso queira apenas{" "}
                  <span className="font-bold">ocultar</span> essa categoria dos
                  filtros você pode clicar em{" "}
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
