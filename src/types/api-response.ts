export type ApiResponse<T> = {
  data: T
  meta?: {
    message: string
  }
}