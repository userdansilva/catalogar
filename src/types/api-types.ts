type PropsWithTimestamps<T> = T & {
  createdAt: string
  updatedAt: string
}

export type User = PropsWithTimestamps<{
  id: string
  name: string
  email: string
  phoneNumber?: string
  catalogs: Array<Catalog>
  currentCatalog?: Catalog
}>

export type UserWithCatalog = User & {
  currentCatalog: Catalog
}

export type Catalog = PropsWithTimestamps<{
  id: string
  name: string
  slug: string
  publishedAt?: string
  isPublished: boolean
  company: null
  theme: null
}>

export type Category = PropsWithTimestamps<{
  id: string
  name: string
  slug: string
  textColor: string
  backgroundColor: string
  isDisabled: boolean
  disabledAt?: string
}>

export type CategoryFilters = {
  field?: "name" | "createdAt"
  sort?: "asc" | "desc"
  page?: number
  perPage?: number
}
