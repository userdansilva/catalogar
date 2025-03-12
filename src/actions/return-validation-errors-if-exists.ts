import { AxiosError } from "axios";
import { ApiError } from "@/types/api-error";
import { returnValidationErrors, ValidationErrors } from "next-safe-action";
import { ZodObject, ZodRawShape } from "zod";

/**
 * @example
 * ```tsx
 * } catch (e) {
 * handleValidationServerErrors(e, catalogSchema)
 * ```
 */
export function returnValidationErrorsIfExists(e: unknown, schema: ZodObject<ZodRawShape>) {
  const apiErrors = (e as AxiosError<ApiError<keyof typeof schema.shape>>)
    .response?.data.errors || []

  const hasValidationErrors = apiErrors.length > 0;

  if (hasValidationErrors) {
    const formattedErrors = apiErrors.reduce((acc, error) => {
      acc[error.field] = { _errors: [error.message] }
      return acc;
    }, {} as ValidationErrors<typeof schema>)

    returnValidationErrors(schema, formattedErrors)
  }
}
