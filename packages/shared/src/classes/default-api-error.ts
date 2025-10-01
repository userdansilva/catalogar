import { DefaultApiError as DefaultApiErrorType } from "@/types";

/**
 * **Não use em componentes**
 *
 * Quando usado dentro de uma action do _next-safe-ation_,
 * será capturado pelo o _handleServerError_ do _safe-action.ts_.
 *
 * O erro será retornado no _e.error.serverError_ do _onError_
 * do _actionProps_ do _useHookFormAction_.
 *
 * Use o _toastServerError_ para exibir a mensagem de erro do backend
 */
export class DefaultApiError extends Error {
  public path: string;
  public statusCode: number;
  public timestamp: string;
  public errors: Array<{
    field: string;
    message: string;
  }>;

  constructor(error: DefaultApiErrorType) {
    super(error.message);

    this.name = "DefaultApiError";
    this.path = error.path;
    this.statusCode = error.statusCode;
    this.timestamp = error.timestamp;
    this.errors = error.errors;
  }
}
