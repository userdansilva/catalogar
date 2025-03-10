export type User = {
  id: string
  name: string
  email: string
  phoneNumber?: string
  catalogs: Array<Catalog>
  currentCatalog?: Catalog
  createdAt: string
  updatedAt: string
}

export type UserWithCatalog = User & {
  currentCatalog: Catalog
}

export type Catalog = {
  id: string
  name: string
  slug: string
  publishedAt?: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
  company: null
  theme: null
}
