import { Button } from "@catalogar/ui/components/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Pronto para vender mais?
          </h2>
          <p className="text-lg md:text-xl opacity-90 max-w-xl mx-auto">
            Junte-se a vários empreendedores que já usam o Catalogar para
            aumentar suas vendas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-base px-8 py-6 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Criar meu catálogo grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="text-sm opacity-70">
            Grátis para sempre • Sem cartão de crédito
          </p>
        </div>
      </div>
    </section>
  );
}
