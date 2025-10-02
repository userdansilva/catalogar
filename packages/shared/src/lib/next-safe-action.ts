import { DefaultApiError } from "@catalogar/shared/classes/default-api-error";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

export const authActionClient = createSafeActionClient({
  defineMetadataSchema: () =>
    z.object({
      actionName: z.string(),
    }),
  handleServerError(error, { metadata }) {
    if (error instanceof DefaultApiError) {
      // Loga erros nos sentry
      for (const message of error.errors) {
        console.error(
          `ExpectedError: ${metadata.actionName}: ${message}`,
          "warning"
        );

        // Sentry.captureMessage(
        //   `ExpectedError: ${metadata.actionName}: ${message}`,
        //   "warning",
        // );
      }

      // Mensagem da api + mensagens relacionadas a cada campo
      return {
        message: error.message,
        errors: error.errors.map((e) => ({
          field: e.field,
          message: e.message,
        })),
      };
    }

    // Caso for um erro inesperado
    console.error(error);
    // Sentry.captureException(error);

    return {
      message: "Ops! Algo deu errado. Por favor, tente novamente",
      errors: [],
    };
  },
});
