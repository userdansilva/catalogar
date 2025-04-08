"use client";

import { routes } from "@/routes";
import { Button } from "@/shadcn/components/ui/button";
import { signIn } from "next-auth/react";
import logo from "@/assets/images/logo.svg";
import Image from "next/image";

export default function SignInOrRegister() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <Image src={logo} alt="Logo escrito catalogar" width={246} />
        </div>

        <div className="text-center">
          <h1 className="text-2xl tracking-tight">
            Boas Vindas ao
            {" "}
            <span className="font-bold">Catalogar</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Entre para gerenciar seus catálogos ou criar um novo cadastro
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            className="w-full max-w-xs"
            onClick={() => signIn("azure-ad-b2c", {
              callbackUrl: routes.dashboard.url,
            })}
          >
            Entrar / Cadastrar
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground" />
      </div>
    </div>
  );
}
