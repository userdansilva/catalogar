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
    description:
      "The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.",
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
  auth: {
    sub: {
      login: {
        title: "Entrar",
        url: "/entrar",
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
        title: "Detalhe item de catálogo",
        url: (reference: number) => `/preview/${reference}`,
      },
    },
  },
  catalogItems: {
    title: "Catálogo",
    description:
      "Estes são os itens já cadastrados neste catálogo. Você pode adicionar, editar, ocultar ou excluir um item.",
    icon: Book,
    url: "/catalogo",
    sub: {
      createFirst: {
        title: "Primeiro Item de Catálogo",
        url: "/primeiro-item-de-catalogo",
      },
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
    description:
      "Aqui você pode ver a lista de categorias já cadastradas, adicionar, editar, desativar ou excluir.",
    icon: Filter,
    url: "/categorias",
    sub: {
      createFirst: {
        title: "Primeira Categoria",
        url: "/primeira-categoria",
      },
      new: {
        title: "Nova categoria",
        url: "/categorias/nova",
      },
      edit: {
        title: "Editar categoria",
        url: (id: string) => `/categorias/${id}/editar`,
      },
    },
  },
  productTypes: {
    title: "Tipos de Produto",
    description:
      "Aqui você pode ver a lista de tipos produtos já cadastrados, adicionar, editar, desativar ou excluir.",
    icon: List,
    url: "/tipos-de-produto",
    sub: {
      createFirst: {
        title: "Primeiro Tipo de Produto",
        url: "/primeiro-tipo-de-produto",
      },
      new: {
        title: "Novo tipo de produto",
        url: "/tipos-de-produto/novo",
      },
      edit: {
        title: "Editar tipo de produto",
        url: (id: string) => `/tipos-de-produto/${id}/editar`,
      },
    },
  },
  company: {
    title: "Empresa",
    description: "Aqui você pode atualizar as informações da sua empresa",
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
    description: "Aqui você pode atualizar o tema do seu catálogo",
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
    description: "Aqui você pode atualizar as configurações do seu catálogo",
    icon: Settings,
    url: "/configuracao",
  },
} as const;
