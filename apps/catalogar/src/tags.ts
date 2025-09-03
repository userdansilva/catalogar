export const tags = {
  users: {
    me: "users-me",
  },
  categories: {
    getAll: "categories",
    getById: (id: string) => `categories-${id}`,
  },
  productTypes: {
    getAll: "productTypes",
    getById: (id: string) => `product-types-${id}`,
  },
  catalogItems: {
    getAll: "catalogItems",
    getById: (id: string) => `catalogItems-${id}`,
    getByIdAny: "catalogItems-any",
  },
  publicCatalog: {
    getBySlug: (slug: string) => `public-catalog-${slug}`,
  },
  createCategory: "createCategory",
  updateCategory: "updateCategory",
  deleteCategory: "deleteCategory",
};
