import { Filter } from "lucide-react";

export const route = {
  categories: {
    title: "Categorias",
    icon: Filter,
    url: "/dashboard/categorias",
    sub: {
      createFirst: {
        title: "Primeira Categoria",
        url: "/dashboard/primeira-categoria",
      },
      new: {
        title: "Nova Categoria",
        url: "/dashboard/categorias/nova",
      },
      edit: {
        title: "Editar Categoria",
        url: (id: string) => `/dashboard/categorias/${id}/editar`,
      },
    },
  },
};
