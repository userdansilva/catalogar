"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@catalogar/ui/components/alert";
import { AlertCircle, Lock } from "lucide-react";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { DefaultApiError } from "@/types/api-response";

export function ExpectedError({ error }: { error: DefaultApiError }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  if (error.statusCode === 400) {
    return (
      <Alert>
        <AlertCircle />
        <AlertTitle>Não foi possível obter dados</AlertTitle>
        <AlertDescription>
          <p>{error.message}</p>
          {error.errors.length >= 1 && (
            <ul className="list-inside list-disc text-sm">
              {error.errors.map((err) => (
                <li key={err.field + err.message}>{err.message}</li>
              ))}
            </ul>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  if (error.statusCode === 401) {
    return (
      <Alert>
        <Lock />
        <AlertTitle>Não autorizado</AlertTitle>
        <AlertDescription>
          Seu usuário não possui as permissões necessárias para acessar estes
          dados.
        </AlertDescription>
      </Alert>
    );
  }

  // Other errors, like 500
  return (
    <Alert variant="destructive">
      <AlertCircle />
      <AlertTitle>Ops! Algo deu errado ao obter dados</AlertTitle>
      <AlertDescription>
        Nosssa equipe já foi acionada e estamos trabalhando para resolver.
      </AlertDescription>
    </Alert>
  );
}
