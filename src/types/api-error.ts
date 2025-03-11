export type ApiError = {
  path: string
  statusCode: number
  timestamp: string
  errors: Array<{
    field: string
    message: string
  }>
}