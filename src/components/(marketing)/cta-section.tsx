/* eslint-disable @next/next/no-html-link-for-pages */
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-primary text-primary-foreground py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl">
            Pronto para vender mais?
          </h2>
          <p className="mx-auto max-w-xl text-lg opacity-90 md:text-xl">
            Junte-se a vários empreendedores que já usam o Catalogar para
            aumentar suas vendas.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/auth/login"
              className={buttonVariants({
                size: "lg",
                className: "dark",
              })}
            >
              Criar meu catálogo grátis
              <ArrowRight />
            </a>
          </div>
          <p className="text-sm opacity-70">
            Grátis para sempre • Sem cartão de crédito
          </p>
        </div>
      </div>
    </section>
  );
}
