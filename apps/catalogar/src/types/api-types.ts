type PropsWithTimestamps<T> = T & {
  createdAt: string;
  updatedAt: string;
};

export type Company = PropsWithTimestamps<{
  name: string;
  description: string;
  mainSiteUrl: string;
  phoneNumber: string;
  businessTypeDescription: string;
}>;

export type Logo = PropsWithTimestamps<{
  id: string;
  fileName: string;
  url: string;
  sizeInBytes: number;
  width: number;
  height: number;
  altText?: string;
  createdAt: string;
}>;

export type Theme = PropsWithTimestamps<{
  primaryColor: string;
  secondaryColor: string;
  logo?: Logo;
}>;

export type Catalog = PropsWithTimestamps<{
  id: string;
  name: string;
  slug?: string;
  publishedAt?: string;
  isPublished: boolean;
  company?: Company;
  theme?: Theme;
}>;

export type User = PropsWithTimestamps<{
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  catalogs: Array<Catalog>;
  currentCatalog?: Catalog;
}>;

export type UserWithCatalog = User & {
  currentCatalog: Catalog;
};

export type Category = PropsWithTimestamps<{
  id: string;
  name: string;
  slug: string;
  textColor: string;
  backgroundColor: string;
  isDisabled: boolean;
  disabledAt?: string;
}>;

export type FiltersWithPagination<T> = T & {
  page?: number;
  perPage?: number;
};

export type CategoryFilters = FiltersWithPagination<{
  field?: "name" | "createdAt";
  sort?: "asc" | "desc";
}>;

export type ProductType = PropsWithTimestamps<{
  id: string;
  name: string;
  slug: string;
  isDisabled: boolean;
  disabledAt?: string;
}>;

export type ProductTypeFilters = FiltersWithPagination<{
  field?: "name" | "createdAt";
  sort?: "asc" | "desc";
}>;

export type StorageSasToken = {
  fileName: string;
  uploadUrl: string;
  accessUrl: string;
};

export type CatalogItemImage = {
  id: string;
  fileName: string;
  url: string;
  sizeInBytes: number;
  width: number;
  height: number;
  altText?: string;
  position: number;
  createdAt: string;
};

export type CatalogItem = PropsWithTimestamps<{
  id: string;
  title: string;
  caption?: string;
  price?: number;
  reference: number;
  productType: ProductType;
  categories: Category[];
  images: CatalogItemImage[];
  isDisabled: boolean;
  disabled?: string;
}>;

export type CatalogItemFilters = FiltersWithPagination<{
  field?: "name" | "createdAt";
  sort?: "asc" | "desc";
}>;

export type PublishedCatalog = Required<Catalog> & {
  categories: Category[];
  productTypes: ProductType[];
  catalogItems: CatalogItem[];
};
