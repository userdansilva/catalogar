export const tags = {
  users: {
    me: "users_me",
  },
  categories: {
    getAll: "categories",
    getById: (id: string) => `categories_${id}`,
  },
};
