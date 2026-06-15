"use client";

import { Button } from "@catalogar/ui/components/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                C
              </span>
            </div>
            <span className="font-bold text-xl">Catalogar</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8"></nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">
              Entrar
            </Button>
            <Button size="sm">Criar catálogo</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Button variant="ghost" className="justify-start">
                  Entrar
                </Button>
                <Button>Criar catálogo</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
