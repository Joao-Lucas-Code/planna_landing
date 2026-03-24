'use client';

export default function Navbar() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[5%] py-5 bg-black/70 backdrop-blur-[18px] border-b border-white/10">
      <div 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="font-syne font-extrabold text-xl tracking-tighter bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent cursor-pointer"
      >
        Planna.AI
      </div>
      
      <ul className="hidden md:flex gap-10 list-none">
        <li><button onClick={() => scrollToSection('features')} className="text-gray-400 text-sm hover:text-white transition-colors">Recursos</button></li>
        <li><button onClick={() => scrollToSection('pricing')} className="text-gray-400 text-sm hover:text-white transition-colors">Preços</button></li>
        <li><button onClick={() => scrollToSection('waitlist')} className="text-gray-400 text-sm hover:text-white transition-colors">Lista de Espera</button></li>
        <li><button onClick={() => scrollToSection('faq')} className="text-gray-400 text-sm hover:text-white transition-colors">FAQ</button></li>
      </ul>

      <button 
        onClick={() => scrollToSection('waitlist')}
        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:300%_300%] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[100%_50%] transition-all duration-500 shadow-lg shadow-purple-500/20"
      >
        Começar grátis
      </button>
    </nav>
  );
}