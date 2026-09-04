"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="pt-BR">
      <body>
        <h2>Alogo deu errado!</h2>
        <button onClick={() => unstable_retry()} type="button">
          Tebtar novamente
        </button>
      </body>
    </html>
  );
}
