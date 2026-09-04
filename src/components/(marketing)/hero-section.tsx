/* eslint-disable @next/next/no-html-link-for-pages */
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import carretilhaIcon from "@/assets/icons/carretilha-icon.svg";
import linhaIcon from "@/assets/icons/linha-icon.svg";
import pipaIcon from "@/assets/icons/pipa-icon.svg";
import velosterIcon from "@/assets/icons/veloster-icon.svg";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl leading-tight font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
                Crie seu catálogo.{" "}
                <span className="bg-foreground text-background px-2">
                  Venda mais.
                </span>
              </h1>
              <p className="text-muted-foreground max-w-lg text-lg leading-relaxed md:text-xl">
                O jeito mais simples de criar catálogos de produtos online.
                Compartilhe com seus clientes e receba pedidos direto no
                WhatsApp.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="/auth/login"
                className={buttonVariants({
                  size: "lg",
                })}
              >
                Criar catálogo grátis
                <ArrowRight />
              </a>
              <Link
                href="/@catalogar"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                  }),
                )}
              >
                <Play />
                Ver demonstração
              </Link>
            </div>

            <p className="text-muted-foreground text-sm">
              ✓ 100% gratuito &nbsp; ✓ Sem cartão de crédito &nbsp; ✓ Comece em
              minutos
            </p>
          </div>

          {/* Right Content - Preview */}
          <div className="relative">
            <div className="bg-card relative overflow-hidden rounded-2xl border shadow-2xl">
              {/* Browser mockup header */}
              <div className="bg-muted/50 flex items-center gap-2 border-b px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="mx-4 flex-1">
                  <div className="bg-background text-muted-foreground rounded-md px-3 py-1.5 text-center text-sm">
                    catalogar.com.br/@sua-loja
                  </div>
                </div>
              </div>

              {/* Preview content */}
              <div className="bg-background p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent-foreground/5 flex h-12 w-12 items-center justify-center rounded-full">
                      <span className="text-accent-foreground/40 text-lg font-bold">
                        L
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">Loja Exemplo</p>
                      <p className="text-muted-foreground text-sm">
                        Pipas e Acessórios
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/30 overflow-hidden rounded-lg border">
                      <div className="bg-muted flex aspect-square items-center justify-center">
                        <Image src={pipaIcon} alt="Pipa Icon" />
                      </div>
                      <div className="space-y-1 p-3">
                        <div className="bg-muted-foreground/10 h-3 w-3/4 rounded" />
                        <div className="bg-accent/20 h-4 w-1/2 rounded" />
                      </div>
                    </div>

                    <div className="bg-muted/30 overflow-hidden rounded-lg border">
                      <div className="bg-muted flex aspect-square items-center justify-center">
                        <Image src={carretilhaIcon} alt="Carretilha Icon" />
                      </div>
                      <div className="space-y-1 p-3">
                        <div className="bg-muted-foreground/10 h-3 w-3/4 rounded" />
                        <div className="bg-accent/20 h-4 w-1/2 rounded" />
                      </div>
                    </div>

                    <div className="bg-muted/30 overflow-hidden rounded-lg border">
                      <div className="bg-muted flex aspect-square items-center justify-center">
                        <Image src={linhaIcon} alt="Linha Icon" />
                      </div>
                      <div className="space-y-1 p-3">
                        <div className="bg-muted-foreground/10 h-3 w-3/4 rounded" />
                        <div className="bg-accent/20 h-4 w-1/2 rounded" />
                      </div>
                    </div>

                    <div className="bg-muted/30 overflow-hidden rounded-lg border">
                      <div className="bg-muted flex aspect-square items-center justify-center">
                        <Image src={velosterIcon} alt="Veloster Icon" />
                      </div>
                      <div className="space-y-1 p-3">
                        <div className="bg-muted-foreground/10 h-3 w-3/4 rounded" />
                        <div className="bg-accent/20 h-4 w-1/2 rounded" />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <div className="bg-accent-foreground/5 flex h-10 flex-1 items-center justify-center rounded-lg">
                      <span className="text-accent-foreground/40 text-sm font-medium">
                        Ver carrinho (3)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="bg-accent/5 absolute top-1/2 left-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
