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
