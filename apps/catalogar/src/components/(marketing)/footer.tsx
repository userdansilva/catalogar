export function Footer() {
  return (
    <footer className="border-t py-12 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  C
                </span>
              </div>
              <span className="font-bold text-xl">Catalogar</span>
            </a>
            <p className="text-muted-foreground max-w-xs">
              A forma mais simples de criar catálogos de produtos e vender pelo
              WhatsApp.
            </p>
          </div>

<div className="space-y-4">
            <h4 className="font-semibold">Suporte</h4>
            <nav className="flex flex-col gap-2">
              <a
                href="https://wa.me/5577988847504"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                WhatsApp
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Catalogar. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <a
              href="#Privacidade"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacidade
            </a>
            <a
              href="#Termos"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Termos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
