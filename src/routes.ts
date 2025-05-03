import {
  Book, Building2, Filter, House, List, Palette, PanelsTopLeft, Settings,
} from "lucide-react";

export const routes = {
  catalog: {
    sub: {
      createFirst: {
        title: "Primeiro catálogo",
        url: "/primeiro-catalogo",
      },
      create: {
        title: "Criar catálogo",
        url: "/criar-catalogo",
      },
    },
  },
  auth: {
    sub: {
      login: {
        title: "Entrar",
        url: "/entrar",
      },
    },
  },
  dashboard: {
    title: "Dashboard",
    icon: House,
    url: "/",
  },
  preview: {
    title: "Preview",
    icon: PanelsTopLeft,
    url: "/preview",
  },
  catalogItems: {
    title: "Catálogo",
    description: "The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.",
    icon: Book,
    url: "/catalogo",
    sub: {
      new: {
        title: "Novo item",
        url: "/catalogo/novo",
      },
      edit: {
        title: "Editar item",
        url: (id: string) => `/catalogo/${id}/editar`,
      },
      disable: {
        title: "Desativar item",
        url: (id: string) => `/catalogo/${id}/desativar`,
      },
      delete: {
        title: "Desativar item",
        url: (id: string) => `/catalogo/${id}/deletar`,
      },
    },
  },
  categories: {
    title: "Categorias",
    description: "The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.",
    icon: Filter,
    url: "/categorias",
    sub: {
      new: {
        title: "Nova categoria",
        url: "/categorias/nova",
      },
      edit: {
        title: "Editar categoria",
        url: (id: string) => `/categorias/${id}/editar`,
      },
      disable: {
        title: "Desativar categoria",
        url: (id: string) => `/categorias/${id}/desativar`,
      },
      delete: {
        title: "Desativar categoria",
        url: (id: string) => `/categorias/${id}/deletar`,
      },
    },
  },
  products: {
    title: "Produtos",
    description: "The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.",
    icon: List,
    url: "/produtos",
    sub: {
      new: {
        title: "Novo produto",
        url: "/produtos/novo",
      },
      edit: {
        title: "Editar produto",
        url: (id: string) => `/produtos/${id}/editar`,
      },
      disable: {
        title: "Desativar produto",
        url: (id: string) => `/produtos/${id}/desativar`,
      },
      delete: {
        title: "Desativar produto",
        url: (id: string) => `/produtos/${id}/deletar`,
      },
    },
  },
  company: {
    title: "Empresa",
    icon: Building2,
    url: "/empresa",
  },
  theme: {
    title: "Tema",
    icon: Palette,
    url: "/tema",
  },
  config: {
    title: "Configuração",
    description: "The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.",
    icon: Settings,
    url: "/configuracao",
  },
} as const;
