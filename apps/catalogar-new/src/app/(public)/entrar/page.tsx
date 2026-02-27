"use client";

import { Button } from "@catalogar/ui/components/button";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import { authClient } from "@/lib/auth-client";

export default function SignInOrRegister() {
  const session = authClient.useSession();

  console.log("session", session);

  const signUp = async () => {
    await authClient.signUp.email(
      {
        email: "daniel.sousa01@catalogar.com.br",
        password: "12345678",
        name: "Daniel Sousa",
        callbackURL: "/dashboard",
      },
      {
        onRequest: (ctx) => {
          console.log("Loading", ctx);
        },
        onSuccess: (ctx) => {
          console.log("Success", ctx);
        },
        onError: (ctx) => {
          console.log("Error", ctx);
        },
      },
    );
  };

  const signIn = async () => {
    await authClient.signIn.email(
      {
        email: "daniel.sousa01@catalogar.com.br",
        password: "12345678",
      },
      {
        onRequest: (ctx) => {
          console.log("Loading", ctx);
        },
        onSuccess: (ctx) => {
          console.log("Success", ctx);
        },
        onError: (ctx) => {
          console.log("Error", ctx);
        },
      },
    );
  };

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <Image src={logo} alt="Logo escrito catalogar" width={246} />
        </div>

        <div className="text-center">
          <h1 className="text-2xl tracking-tight">
            Boas Vindas ao <span className="font-bold">Catalogar</span>
          </h1>
          <p className="text-muted-foreground mt-4">
            Entre para gerenciar seus catálogos ou criar um novo cadastro
          </p>
        </div>

        <div className="mt-8 flex justify-center flex-col gap-2 items-center">
          <Button size="lg" className="w-full max-w-xs" onClick={signIn}>
            Entrar
          </Button>
          <Button
            size="lg"
            className="w-full max-w-xs"
            onClick={signUp}
            variant="outline"
          >
            Cadastrar
          </Button>
        </div>

        <p className="text-muted-foreground mt-6 text-center text-sm" />
      </div>
    </div>
  );
}
