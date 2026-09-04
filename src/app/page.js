import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-canvas min-h-screen text-ink">
      <Navbar />

      {/* Ritmo das secoes — alterna a superficie para a pagina nao virar
          um bloco escuro continuo:
          hero (canvas) → stats (surface) → features (canvas)
          → depoimentos (surface) → precos (PAPEL CLARO)
          → faq (canvas) → cta (canvas texturizado) */}
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <LeadForm />

      <Footer />
    </main>
  );
}
