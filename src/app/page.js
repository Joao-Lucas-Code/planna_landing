import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';
import FloatingOrbs from '@/components/FloatingOrbs';

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white">
      {/* Elementos fixos de fundo e navegação */}
      <FloatingOrbs />
      <Navbar />
      
      {/* Conteúdo da página - A ordem aqui define o que aparece primeiro */}
      <div className="relative z-10">
        <Hero />          {/* PRECISA SER O PRIMEIRO */}
        <Features />      {/* Seção "Tudo sob controle" */}
        <Pricing />
        <LeadForm />     {/* Seção de capturar e-mail */}
        <FAQ />
      </div>
      
      <Footer />
    </main>
  );
}