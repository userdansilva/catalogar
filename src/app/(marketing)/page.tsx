import { CTASection } from "@/components/(marketing)/cta-section";
import { FeaturesSection } from "@/components/(marketing)/features-section";
import { Footer } from "@/components/(marketing)/footer";
import { Header } from "@/components/(marketing)/header";
import { HeroSection } from "@/components/(marketing)/hero-section";
import { HowItWorksSection } from "@/components/(marketing)/how-it-works-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crie seu Catálogo Grátis",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
