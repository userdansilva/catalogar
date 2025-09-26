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

export const routes = {
  public: {
    title: "Catálogo",
    url: (slug: string) => `/@${slug}`,
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
      prePublish: {
        title: "Pré-publicação",
        url: "/dashboard/pre-publicacao",
      },
      published: {
        title: "Publicado",
        url: "/dashboard/publicado",
      },
      new: {
        title: "Criar catálogo",
        url: "/dashboard/meus-catalogos/novo",
      },
    },
  },
  dashboard: {
    title: "Página Inicial",
    icon: House,
    url: "/dashboard",
  },
  preview: {
    title: "Pré-visualização",
    icon: PanelsTopLeft,
    url: "/dashboard/preview",
    sub: {
      catalogItemDetail: {
        url: (reference: number) => `/dashboard/preview/${reference}`,
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
      new: {
        title: "Novo Item de Catálogo",
        url: "/dashboard/catalogo/novo",
      },
      edit: {
        title: "Editar Item de Catálogo",
        url: (id: string) => `/dashboard/catalogo/${id}/editar`,
      },
      disable: {
        title: "Desativar Item de Catálogo",
        url: (id: string) => `/dashboard/catalogo/${id}/desativar`,
      },
      delete: {
        title: "Deletar Item de Catálogo",
        url: (id: string) => `/dashboard/catalogo/${id}/deletar`,
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
  productTypes: {
    title: "Tipos de Produto",
    icon: List,
    url: "/dashboard/tipos-de-produto",
    sub: {
      createFirst: {
        title: "Primeiro Tipo de Produto",
        url: "/dashboard/primeiro-tipo-de-produto",
      },
      new: {
        title: "Novo Tipo de Produto",
        url: "/dashboard/tipos-de-produto/novo",
      },
      edit: {
        title: "Editar Tipo de Produto",
        url: (id: string) => `/dashboard/tipos-de-produto/${id}/editar`,
      },
    },
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
} as const;
