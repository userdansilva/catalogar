import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
