"use client";

import { Button } from "@catalogar/ui/components/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "@/assets/images/logo.svg";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between flex-row">
          {/* Logo */}
          <div>
            <Link href="/" className="">
              <Image
                src={logo}
                alt="Logo escrita Catalogar"
                className="h-8 w-full"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8"></nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="/auth/login">Entrar</a>
            </Button>
            <Button size="sm" asChild>
              <a href="/auth/login">Criar catálogo</a>
            </Button>
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
                <Button variant="ghost" asChild>
                  <a href="/auth/login">Entrar</a>
                </Button>
                <Button asChild>
                  <a href="/auth/login">Criar catálogo</a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
