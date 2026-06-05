import { Layers, Link2, MessageCircle, ShieldOff } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Catálogos ilimitados",
    description:
      "Crie quantos catálogos precisar, sem limite de produtos. Organize suas coleções do seu jeito.",
  },
  {
    icon: Link2,
    title: "Link personalizado",
    description:
      "Tenha um link exclusivo para sua loja. Compartilhe nas redes sociais e facilite o acesso dos clientes.",
  },
  {
    icon: ShieldOff,
    title: "Zero anúncios",
    description:
      "Nenhum anúncio de terceiros aparece no seu catálogo. Experiência limpa para você e seus clientes.",
  },
  {
    icon: MessageCircle,
    title: "Vendas por WhatsApp",
    description:
      "Seus clientes escolhem os itens, montam o carrinho e finalizam o pedido direto no WhatsApp.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">
            Tudo que você precisa para alavancar suas vendas
          </h2>
          <p className="text-lg text-muted-foreground">
            Ferramentas simples e poderosas para transformar seu negócio
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative p-6 rounded-2xl border bg-background hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
