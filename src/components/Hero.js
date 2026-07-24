'use client';

import DashboardMockup from './DashboardMockup';
import HeroOrbit from './HeroOrbit';

export default function Hero() {
  const scrollToWaitlist = (e) => {
    if (e) e.preventDefault();
    
    // Procura o ID ou desce para o final como plano B
    const element = document.getElementById('waitlist') || document.querySelector('section form')?.parentElement;
    
    if (element) {
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-[5%] pt-28 pb-16 relative overflow-hidden">

      {/* Objeto abstrato de fundo (CSS puro, decorativo) */}
      <HeroOrbit />

      {/* 1. Badge */}
      <div className="reveal relative z-10 inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-500 px-4 py-1.5 rounded-full text-[0.78rem] font-medium uppercase tracking-widest mb-8">
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
        Inteligência Artificial + Finanças
      </div>
      
      {/* 2. Título */}
      <h1 className="reveal delay-200 relative z-10 font-syne font-extrabold text-4xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-[1100px]">
        O primeiro agente de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">IA</span> que realmente <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">entende seu dinheiro</span>
      </h1>

      {/* 3. Subtítulo */}
      <p className="reveal delay-400 relative z-10 mt-8 text-zinc-400 text-xl md:text-2xl max-w-2xl leading-relaxed font-dm">
        O Planna.IA analisa seus gastos, otimiza seus investimentos e entrega insights em tempo real — tudo numa interface intuitiva e poderosa.
      </p>

      {/* 4. Botões */}
      <div className="reveal delay-600 relative z-10 mt-10 flex flex-col md:flex-row gap-6 items-center">
        <button 
          onClick={scrollToWaitlist}
          className="bg-gradient-to-r from-blue-500 to-violet-500 px-8 py-4 rounded-xl font-medium text-lg shadow-[0_0_30px_rgba(139,92,246,0.25)] hover:scale-105 transition-transform text-white cursor-pointer"
        >
          Começar grátis →
        </button>
        
        <button 
          onClick={scrollToWaitlist}
          className="px-8 py-4 rounded-xl border border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20 transition-all text-base font-medium cursor-pointer"
        >
          Teste 14 dias grátis
        </button>
      </div>

      {/* 5. Mockup do Dashboard */}
      <div className="reveal delay-800 w-full flex justify-center relative max-w-6xl mt-16 mb-20">
        {/* Glow atras do mockup para efeito de flutuacao */}
        <div className="absolute inset-x-4 top-8 -bottom-4 bg-violet-500/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 w-full">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
