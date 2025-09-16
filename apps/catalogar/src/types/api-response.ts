export type Meta = {
  message?: string;
};

export type Pagination = {
  currentPage: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
};

export type MetaWithPagination = Meta & {
  pagination: Pagination;
};

export type ApiResponse<
  T extends object | object[],
  M extends Meta | MetaWithPagination = Meta,
> = {
  data: T;
  meta?: M;
};

export type ApiResponseWithPagination<T extends object[]> = ApiResponse<
  T,
  MetaWithPagination
>;

export type DefaultApiError<T = string> = {
  path: string;
  message: string;
  statusCode: number;
  timestamp: string;
  errors: Array<{
    field: T;
    message: string;
  }>;
};
