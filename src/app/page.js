import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import FloatingOrbs from '@/components/FloatingOrbs';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <FloatingOrbs />
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <Features />
      </div>
    </main>
  );
}