/* eslint-disable react-hooks/rules-of-hooks */

"use client";

import { ColumnDef } from "@tanstack/react-table";
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
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
} from "@catalogar/ui/alert-dialog";
import { Badge } from "@catalogar/ui/badge";
import { Button } from "@catalogar/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@catalogar/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@catalogar/ui/form";
import { Input } from "@catalogar/ui/input";
import { Category } from "@/services/get-category";
import { route } from "@/route";
import { toggleCategoryStatusAction } from "@/actions/toggle-status-category-action";
import { deleteCategoryAction } from "@/actions/delete-category-action";

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
          confirm: "",
        },
      });

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
            loading: "Deletando categoria...",
            success: "Categoria deletada com sucesso!",
          },
        );

      return (
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>

            <DropdownMenuItem asChild>
              <Link
                href={route.categories.sub.edit.url(id)}
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
                      onClick={handleToggleStatus}
                      className="cursor-pointer"
                    >
                      Sim! Quero ocultar
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
                      Tem certeza que quer deletar essa categoria?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Essa ação não poderá ser desfeita. Caso queira apenas{" "}
                      <span className="font-bold">ocultar</span> essa categoria
                      dos filtros você pode clicar em{" "}
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
