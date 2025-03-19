export const routes = {
  auth: {
    login: "/entrar",
  },
  dashboard: {
    home: "/",
  },
  catalog: {
    first: "/primeiro-catalogo",
    create: "/criar-catalogo",
  },
  catalogItem: {
    home: "/meus-itens",
  },
  category: {
    home: "/categorias",
    new: "/categorias/nova",
    edit: (id: string) => `/categorias/${id}/editar`,
    disable: (id: string) => `/categorias/${id}/desativar`,
    delete: (id: string) => `/categorias/${id}/deletar`,
  },
  product: {
    home: "/produtos",
  },
  company: {
    home: "/empresa",
  },
  theme: {
    home: "/tema",
  },
  config: {
    home: "/configuracao",
  },
} as const;
