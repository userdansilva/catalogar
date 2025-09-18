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
    url: "/meus-catalogos",
    sub: {
      createFirst: {
        title: "Primeiro catálogo",
        url: "/primeiro-catalogo",
      },
      prePublish: {
        title: "Pré-publicação",
        url: "/pre-publicacao",
      },
      published: {
        title: "Publicado",
        url: "/publicado",
      },
      new: {
        title: "Criar catálogo",
        url: "/meus-catalogos/novo",
      },
    },
  },
  dashboard: {
    title: "Página Inicial",
    icon: House,
    url: "/",
  },
  preview: {
    title: "Pré-visualização",
    icon: PanelsTopLeft,
    url: "/preview",
    sub: {
      catalogItemDetail: {
        url: (reference: number) => `/preview/${reference}`,
      },
    },
  },
  catalogItems: {
    title: "Catálogo",
    icon: Book,
    url: "/catalogo",
    sub: {
      createFirst: {
        title: "Primeiro Item de Catálogo",
        url: "/primeiro-item-de-catalogo",
      },
      new: {
        title: "Novo Item de Catálogo",
        url: "/catalogo/novo",
      },
      edit: {
        title: "Editar Item de Catálogo",
        url: (id: string) => `/catalogo/${id}/editar`,
      },
      disable: {
        title: "Desativar Item de Catálogo",
        url: (id: string) => `/catalogo/${id}/desativar`,
      },
      delete: {
        title: "Deletar Item de Catálogo",
        url: (id: string) => `/catalogo/${id}/deletar`,
      },
    },
  },
  categories: {
    title: "Categorias",
    icon: Filter,
    url: "/categorias",
    sub: {
      createFirst: {
        title: "Primeira Categoria",
        url: "/primeira-categoria",
      },
      new: {
        title: "Nova Categoria",
        url: "/categorias/nova",
      },
      edit: {
        title: "Editar Categoria",
        url: (id: string) => `/categorias/${id}/editar`,
      },
    },
  },
  productTypes: {
    title: "Tipos de Produto",
    icon: List,
    url: "/tipos-de-produto",
    sub: {
      createFirst: {
        title: "Primeiro Tipo de Produto",
        url: "/primeiro-tipo-de-produto",
      },
      new: {
        title: "Novo Tipo de Produto",
        url: "/tipos-de-produto/novo",
      },
      edit: {
        title: "Editar Tipo de Produto",
        url: (id: string) => `/tipos-de-produto/${id}/editar`,
      },
    },
  },
  company: {
    title: "Empresa",
    icon: Building2,
    url: "/empresa",
    sub: {
      new: {
        title: "Cadastrar empresa",
        url: "/cadastrar-empresa",
      },
    },
  },
  theme: {
    title: "Tema",
    icon: Palette,
    url: "/tema",
    sub: {
      new: {
        title: "Criar tema",
        url: "/criar-tema",
      },
    },
  },
  config: {
    title: "Configuração",
    icon: Settings,
    url: "/configuracao",
  },
} as const;
