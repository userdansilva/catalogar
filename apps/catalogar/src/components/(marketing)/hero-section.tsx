import { Button } from "@catalogar/ui/components/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight">
                Crie seu catálogo.{" "}
                <span className="bg-foreground px-2 text-background">
                  Venda mais.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                O jeito mais simples de criar catálogos de produtos online.
                Compartilhe com seus clientes e receba pedidos direto no
                WhatsApp.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-base px-8 py-6 bg-primary hover:bg-primary/90"
                asChild
              >
                <a href="/auth/login">
                  Criar catálogo grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-6 border-2"
                asChild
              >
                <Link href="/@77pipas">
                  <Play className="mr-2 h-5 w-5" />
                  Ver demonstração
                </Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              ✓ 100% gratuito &nbsp; ✓ Sem cartão de crédito &nbsp; ✓ Comece em
              minutos
            </p>
          </div>

          {/* Right Content - Preview */}
          <div className="relative">
            <div className="relative rounded-2xl border bg-card shadow-2xl overflow-hidden">
              {/* Browser mockup header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-background rounded-md px-3 py-1.5 text-sm text-muted-foreground text-center">
                    catalogar.com.br/@sua-loja
                  </div>
                </div>
              </div>

              {/* Preview content */}
              <div className="p-6 bg-background">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-accent font-bold text-lg">L</span>
                    </div>
                    <div>
                      <p className="font-semibold">Loja Exemplo</p>
                      <p className="text-sm text-muted-foreground">
                        Roupas e Acessórios
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="rounded-lg border bg-muted/30 overflow-hidden"
                      >
                        <div className="aspect-square bg-muted flex items-center justify-center">
                          <div className="w-12 h-12 rounded-lg bg-muted-foreground/10" />
                        </div>
                        <div className="p-3 space-y-1">
                          <div className="h-3 bg-muted-foreground/10 rounded w-3/4" />
                          <div className="h-4 bg-accent/20 rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <div className="flex-1 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <span className="text-sm text-accent font-medium">
                        Ver carrinho (3)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
