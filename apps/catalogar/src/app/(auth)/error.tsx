"use client";

import { AlertCircle, RefreshCw, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@catalogar/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@catalogar/ui/components/card";
import { Alert, AlertDescription } from "@catalogar/ui/components/alert";
import Loader from "@/components/loader";

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    console.error(error);
  }, [error]);

  if (retrying) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="bg-destructive/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <AlertCircle className="text-destructive h-6 w-6" />
          </div>
          <CardTitle className="text-xl font-semibold">
            Ops! Algo deu errado
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Sua sessão pode ter expirado ou há um problema interno na
            autenticação. Por favor, clique em tentar novamente.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Se o problema persistir, tente sair e entrar novamente.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col gap-3 *:w-full">
            <Button
              onClick={() => {
                setRetrying(true);
                setTimeout(() => {
                  reset();
                }, 1_500);
              }}
            >
              <RefreshCw />
              Tentar novamente
            </Button>

            <Button variant="outline" asChild>
              <Link href="/auth/logout">
                <LogOut />
                Sair
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
