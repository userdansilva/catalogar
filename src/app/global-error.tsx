"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body>
        <h2>Algo deu errado!</h2>
        <button onClick={() => retry()} type="button">
          Tentar novamente
        </button>
      </body>
    </html>
  );
}
