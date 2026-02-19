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
  AlertDialogTrigger,
} from "@catalogar/ui/components/alert-dialog";
import { Button } from "@catalogar/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@catalogar/ui/components/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@catalogar/ui/components/form";
import { Input } from "@catalogar/ui/components/input";
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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { deleteProductTypeAction } from "@/actions/delete-product-type-action";
import { toggleProductTypeStatusAction } from "@/actions/toggle-status-product-type-action";
import { routes } from "@/routes";
import type { ProductType } from "@/schemas/product-type";

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
      const { isDisabled } = row.original;

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
      const { id, isDisabled } = row.original;

      const schema = z.object({
        confirm: z
          .string()
          .min(1, "Campo obrigatório")
          .refine((s) => s === "DELETAR", {
            message: "Digite DELETAR para confirmar.",
          }),
      });

      const [alertDialogOpen, setAlertDialogOpen] = useState(false);
      const [dropdownOpen, setDropdownOpen] = useState(false);

      const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
          confirm: "" as "DELETAR",
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
          executeToggleStatusAsync({ id }).then((result) => {
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
          success: "Tipo de produto deletado!",
        });
      };

      return (
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>

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
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <EyeOff className="mr-2 size-4" />
                    Ocultar
                  </DropdownMenuItem>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Tem certeza que quer ocultar esse tipo de produto?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                      Ao ocultar o tipo de produto, os itens vinculados a ele
                      NÃO seram exibidos no seu catálogo. Você pode voltar a
                      exibir a qualquer momento clicando em{" "}
                      <span className="inline rounded-sm border px-2 py-1 text-xs text-nowrap">
                        <CloudUpload className="-mt-1 mr-1 inline size-4" />
                        Ativar
                      </span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                      <Button variant="secondary">Cancelar</Button>
                    </AlertDialogCancel>

                    <AlertDialogAction asChild>
                      <Button onClick={handleToggleStatus}>
                        Sim! Quero ocultar
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
                <CloudUpload className="mr-2 size-4" />
                Ativar
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            <AlertDialog
              open={alertDialogOpen}
              onOpenChange={setAlertDialogOpen}
            >
              <Form {...form}>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Trash className="mr-2 size-4" />
                    Deletar
                  </DropdownMenuItem>
                </AlertDialogTrigger>

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
                      Caso queira apenas{" "}
                      <span className="font-bold">ocultar</span> temporariamente
                      essses itens vinculados você pode clicar em{" "}
                      <span className="inline rounded-sm border px-2 py-1 text-xs">
                        <EyeOff className="-mt-1 mr-1 inline size-4" />
                        Ocultar
                      </span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <FormField
                    name="confirm"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Digite DELETAR"
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

                  <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                      <Button variant="secondary">Cancelar</Button>
                    </AlertDialogCancel>

                    <Button
                      variant="destructive"
                      onClick={form.handleSubmit(() => {
                        handleRemove();
                        setAlertDialogOpen(false);
                        setDropdownOpen(false);
                      })}
                    >
                      Sim! Quero deletar
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
