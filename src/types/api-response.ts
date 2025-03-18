export type ApiResponse<T, M extends Meta | MetaWithPagination = Meta> = {
  data: T
  meta: M
}

export type ApiResponseWithPagination<T> = ApiResponse<T, MetaWithPagination>

export type Meta = {
  message?: string
}

export type MetaWithPagination = Meta & {
  pagination: Pagination
}

export type Pagination = {
  currentPage: number
  perPage: number
  totalPages: number
  totalItems: number
}
