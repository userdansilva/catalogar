/**
 * @example
 * ```tsx
 * const apiErrors = (e as AxiosError<ApiError<keyof typeof catalogSchema.shape>>)
 *    .response?.data.errors || []
 * ```
 */
export type ApiError<T = string> = {
  path: string;
  message: string;
  statusCode: number;
  timestamp: string;
  errors: Array<{
    field: T;
    message: string;
  }>;
};
