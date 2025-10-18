"use client";

import { Alert, AlertDescription, AlertTitle } from "@catalogar/ui/alert";
import { Button } from "@catalogar/ui/button";
import { AlertCircle } from "lucide-react";

export function UncaughtException({ reset }: { reset: () => void }) {
  return (
    <Alert variant="destructive">
      <AlertCircle />
      <AlertTitle>Ops! Algo deu errado ao obter dados</AlertTitle>
      <AlertDescription>
        <p>
          Nosssa equipe já foi acionada e estamos trabalhando para resolver.
        </p>

        <Button onClick={() => reset()} variant="outline">
          Tentar novamente
        </Button>
      </AlertDescription>
    </Alert>
  );
}
