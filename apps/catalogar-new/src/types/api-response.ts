type Meta =
  | {
      message?: string;
    }
  | undefined;

type MetaWithPagination = Required<Meta> & {
  pagination: Pagination;
};

export type Pagination = {
  currentPage: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
};

type NotPaginated<T extends object | object[]> = {
  data: T;
  meta: Meta;
};

export type Paginated<T extends object[]> = {
  data: T;
  meta: MetaWithPagination;
};

export type ApiResponse<T extends object | object[] | Paginated<object[]>> =
  T extends Paginated<object[]> ? T : NotPaginated<T>;

export type ApiResponseError = {
  path: string;
  message: string;
  statusCode: number;
  timestamp: string;
  errors: Array<{
    field: string;
    message: string;
  }>;
};
