export const tags = {
  users: {
    me: "users_me"
  },
  categories: {
    findAll: "categories",
    getById: (id: string) => `categories_${id}`
  }
}
