import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { ExpectedError } from "@/classes/ExpectedError";

export const authActionClient = createSafeActionClient({
  defineMetadataSchema: () =>
    z.object({
      actionName: z.string(),
    }),
  handleServerError(error, { metadata }) {
    if (error instanceof ExpectedError) {
      for (const message of error.errors) {
        console.error(
          `ExpectedError: ${metadata.actionName}: ${message}`,
          "warning",
        );
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

    return {
      message: "Ops! Algo deu errado. Por favor, tente novamente",
      errors: [],
    };
  },
});
