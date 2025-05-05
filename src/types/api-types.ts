type PropsWithTimestamps<T> = T & {
  createdAt: string
  updatedAt: string
}

export type Company = PropsWithTimestamps<{
  name: string
  description: string
  mainSiteUrl: string
  phoneNumber: string
  businessTypeDescription: string
}>

export type Logo = PropsWithTimestamps<{
  name: string
  url: string
  width: number
  height: number
}>

export type Theme = PropsWithTimestamps<{
  primaryColor: string
  secondaryColor: string
  logo?: Logo
}>

export type Catalog = PropsWithTimestamps<{
  id: string
  name: string
  slug: string
  publishedAt?: string
  isPublished: boolean
  company?: Company
  theme?: Theme
}>

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

export type Category = PropsWithTimestamps<{
  id: string
  name: string
  slug: string
  textColor: string
  backgroundColor: string
  isDisabled: boolean
  disabledAt?: string
}>

export type FiltersWithPagination<T> = T & {
  page?: number
  perPage?: number
}

export type CategoryFilters = FiltersWithPagination<{
  field?: "name" | "createdAt"
  sort?: "asc" | "desc"
}>

export type Product = PropsWithTimestamps<{
  id: string
  name: string
  slug: string
  isDisabled: boolean
  disabledAt?: string
}>

export type ProductFilters = FiltersWithPagination<{
  field?: "name" | "createdAt"
  sort?: "asc" | "desc"
}>

export type Image = {
  sasToken: string;
  name: string;
  url: string;
}

export type CatalogItem = PropsWithTimestamps<{
  id: string;
  title: string;
  caption?: string;
  price?: number;
  reference: number;
  product: Product;
  categories: Category[];
  images: {
    id: string;
    name: string;
    url: string;
    position: number;
    createdAt: string;
  }[];
  isDisabled: boolean;
  disabled?: string;
}>

export type CatalogItemFilters = FiltersWithPagination<{
  field?: "name" | "createdAt"
  sort?: "asc" | "desc"
}>
