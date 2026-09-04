/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { buttonVariants } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "@/assets/images/logo.svg";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 flex-row items-center justify-between">
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
          <nav className="hidden items-center gap-8 md:flex"></nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 md:flex">
            <a
              href="/auth/login"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              Entrar
            </a>
            <a
              href="/auth/login"
              className={buttonVariants({
                size: "lg",
              })}
            >
              Criar catálogo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="p-2 md:hidden"
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
          <div className="border-t py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <a
                  href="/auth/login"
                  className={buttonVariants({
                    variant: "ghost",
                  })}
                >
                  Entrar
                </a>
                <a href="/auth/login" className={buttonVariants()}>
                  Criar catálogo
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
