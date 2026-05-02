"use client";

import { Badge } from "@catalogar/ui/components/badge";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Category } from "@/gen/models";

export const columns: ColumnDef<Category>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => {
      const { name } = row.original;

      return <Badge>{name}</Badge>;
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
];
