"use client";

import Image from "next/image";
import { Button } from "@catalogar/ui/components/button";
import logo from "@/assets/images/logo.svg";

export default function SignInOrRegister() {
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

        <div className="mt-8 flex justify-center">
          <Button size="lg" className="w-full max-w-xs" asChild>
            <a href="/auth/login">Entrar / Cadastrar</a>
          </Button>
        </div>

        <p className="text-muted-foreground mt-6 text-center text-sm" />
      </div>
    </div>
  );
}
