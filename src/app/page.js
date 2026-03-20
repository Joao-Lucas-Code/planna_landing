import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import FloatingOrbs from '../components/FloatingOrbs';
import LeadForm from '../components/LeadForm';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <FloatingOrbs />
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <Features />
        <Pricing />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}