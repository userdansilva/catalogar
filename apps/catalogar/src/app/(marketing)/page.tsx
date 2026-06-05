import { CTASection } from "@/components/(marketing)/cta-section";
import { FeaturesSection } from "@/components/(marketing)/features-section";
import { Footer } from "@/components/(marketing)/footer";
import { Header } from "@/components/(marketing)/header";
import { HeroSection } from "@/components/(marketing)/hero-section";
import { HowItWorksSection } from "@/components/(marketing)/how-it-works-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
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
