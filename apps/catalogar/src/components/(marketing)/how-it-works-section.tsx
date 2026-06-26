const steps = [
  {
    number: "01",
    title: "Crie sua conta",
    description:
      "Cadastre-se gratuitamente em menos de 1 minuto. Sem complicação.",
  },
  {
    number: "02",
    title: "Monte seu catálogo",
    description:
      "Adicione seus produtos com fotos, descrições e preços. Organize por categorias.",
  },
  {
    number: "03",
    title: "Compartilhe o link",
    description:
      "Divulgue seu link personalizado nas redes sociais e comece a receber pedidos.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">
            Comece a vender em 3 passos
          </h2>
          <p className="text-lg text-muted-foreground">
            Criar seu catálogo é rápido e fácil
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-6">
                {step.number}
              </div>
              {Number(step.number) < steps.length && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
              )}
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
