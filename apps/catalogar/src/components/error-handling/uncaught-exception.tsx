import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@catalogar/ui/components/alert";
import { Button } from "@catalogar/ui/components/button";
import { AlertCircle } from "lucide-react";

export function UncaughtException({
  unstable_retry,
}: {
  unstable_retry: () => void;
}) {
  return (
    <Alert variant="destructive">
      <AlertCircle />
      <AlertTitle>Ops! Algo deu errado ao obter dados</AlertTitle>
      <AlertDescription>
        <p>
          Nosssa equipe já foi acionada e estamos trabalhando para resolver.
        </p>

        <Button onClick={() => unstable_retry()} variant="outline">
          Tentar novamente
        </Button>
      </AlertDescription>
    </Alert>
  );
}
