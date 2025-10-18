import {
  Book,
  Building2,
  Filter,
  House,
  List,
  Palette,
  PanelsTopLeft,
  Settings,
} from "lucide-react";

export const route = {
  dashboard: {
    title: "Página Inicial",
    icon: House,
    url: "/dashboard",
  },
  catalog: {
    title: "Catálogo",
    icon: Book,
    url: "/dashboard/meus-catalogos",
    sub: {
      createFirst: {
        title: "Primeiro catálogo",
        url: "/dashboard/primeiro-catalogo",
      },
    },
  },
  productTypes: {
    title: "Tipos de Produto",
    icon: List,
    url: "/dashboard/tipos-de-produto",
    sub: {
      createFirst: {
        title: "Primeiro Tipo de Produto",
        url: "/dashboard/primeiro-tipo-de-produto",
      },
    },
  },
  categories: {
    title: "Categorias",
    icon: Filter,
    url: "/dashboard/categorias",
    sub: {
      createFirst: {
        title: "Primeira Categoria",
        url: "/dashboard/primeira-categoria",
      },
    },
  },
  catalogItems: {
    title: "Catálogo",
    icon: Book,
    url: "/dashboard/catalogo",
    sub: {
      createFirst: {
        title: "Primeiro Item de Catálogo",
        url: "/dashboard/primeiro-item-de-catalogo",
      },
    },
  },
  preview: {
    title: "Pré-visualização",
    icon: PanelsTopLeft,
    url: "/dashboard/preview",
  },
  company: {
    title: "Empresa",
    icon: Building2,
    url: "/dashboard/empresa",
    sub: {
      new: {
        title: "Cadastrar empresa",
        url: "/dashboard/cadastrar-empresa",
      },
    },
  },
  theme: {
    title: "Tema",
    icon: Palette,
    url: "/dashboard/tema",
    sub: {
      new: {
        title: "Criar tema",
        url: "/dashboard/criar-tema",
      },
    },
  },
  config: {
    title: "Configuração",
    icon: Settings,
    url: "/dashboard/configuracao",
  },
};
