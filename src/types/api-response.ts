export type Meta = {
  message?: string
}

export type Pagination = {
  currentPage: number
  perPage: number
  totalPages: number
  totalItems: number
}

export type MetaWithPagination = Meta & {
  pagination: Pagination
}

export type ApiResponse<T, M extends Meta | MetaWithPagination = Meta> = {
  data: T
  meta: M
}

export type ApiResponseWithPagination<T> = ApiResponse<T, MetaWithPagination>
