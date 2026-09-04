import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-card border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <span className="text-primary-foreground text-sm font-bold">
                  C
                </span>
              </div>
              <span className="text-xl font-bold">Catalogar</span>
            </Link>
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
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                WhatsApp
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-muted-foreground text-sm">
            © 2026 Catalogar. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
