"use client";

import { startTransition, useEffect, useState } from "react";
import * as Sentry from "@sentry/nextjs";
import { Button } from "@catalogar/ui/components/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@catalogar/ui/components/card";
import { DefaultApiError } from "@/types/api-response";

function RetryButton() {
  const router = useRouter();
  const [isResetting, setIsResetting] = useState(false);

  const retry = () => {
    setIsResetting(true);

    startTransition(() => {
      router.refresh();
      setIsResetting(false);
    });
  };

  return (
    <Button onClick={retry} size="sm" disabled={isResetting}>
      {isResetting ? "Recarregando..." : "Tentar novamente"}
    </Button>
  );
}

export function ExpectedError({ error }: { error: DefaultApiError }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  if (error.statusCode === 400) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">{error.message}</CardTitle>
          {error.errors.length >= 1 && (
            <CardDescription className="text-xs">
              <ul className="list-inside list-disc">
                {error.errors.map((err) => (
                  <li key={err.field + err.message}>{err.message}</li>
                ))}
              </ul>
            </CardDescription>
          )}
          <CardAction>
            <RetryButton />
          </CardAction>
        </CardHeader>
      </Card>
    );
  }

  // Other errors, like 500
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Ocorreu um erro inesperado!</CardTitle>
        <CardDescription className="text-xs">
          Por favor, tente novamente. Se o erro persistir, tente novamente mais
          tarde.
        </CardDescription>
        <CardAction>
          <RetryButton />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
