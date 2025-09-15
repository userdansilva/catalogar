import { DefaultApiError } from "@/types/api-response";

/**
 * Quando usado dentro de uma action do _next-safe-ation_,
 * será capturado pelo o _handleServerError_ do _safe-action.ts_
 */
export class ExpectedError extends Error {
  public path: string;
  public statusCode: number;
  public timestamp: string;
  public errors: Array<{
    field: string;
    message: string;
  }>;

  constructor(error: DefaultApiError) {
    super(error.message);

    this.name = "ExpectedError";
    this.path = error.path;
    this.statusCode = error.statusCode;
    this.timestamp = error.timestamp;
    this.errors = error.errors;
  }
}
