import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FloatingOrbs from '@/components/FloatingOrbs';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <FloatingOrbs />
      <Navbar />
      <div className="relative z-10">
        <Hero />
      </div>
    </main>
  );
}