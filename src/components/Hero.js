'use client';

import DashboardMockup from './DashboardMockup';

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
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-[5%] pt-28 relative overflow-hidden">
      
      {/* 1. Badge */}
      <div className="reveal inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-500 px-4 py-1.5 rounded-full text-[0.78rem] font-medium uppercase tracking-widest mb-8">
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
        Inteligência Artificial + Finanças
      </div>
      
      {/* 2. Título */}
      <h1 className="reveal delay-200 font-syne font-extrabold text-5xl md:text-8xl leading-[1.15] tracking-tight max-w-[960px]">
        O primeiro agente de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">IA</span> que realmente <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">entende seu dinheiro</span>
      </h1>

      {/* 3. Subtítulo */}
      <p className="reveal delay-400 mt-6 text-gray-400 text-lg md:text-xl max-w-[560px] leading-relaxed font-dm">
        O Planna.AI analisa seus gastos, otimiza seus investimentos e entrega insights em tempo real — tudo numa interface intuitiva e poderosa.
      </p>

      {/* 4. Botões */}
      <div className="reveal delay-600 mt-10 mb-16 flex flex-col md:flex-row gap-4 items-center">
        <button 
          onClick={scrollToWaitlist}
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 py-3 rounded-xl font-medium shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:scale-105 transition-transform text-white cursor-pointer"
        >
          Começar grátis →
        </button>
        
        <button 
          onClick={scrollToWaitlist}
          className="px-8 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all text-sm font-medium cursor-pointer"
        >
          Teste 14 dias grátis
        </button>
      </div>

      {/* 5. Mockup com os Cards Flutuantes */}
      <div className="reveal delay-800 w-full flex justify-center relative max-w-5xl">
        {/* CARD FLUTUANTE 1 (Esquerda Topo) - Agora Roxo */}
        <div className="hidden md:flex absolute -left-12 top-12 z-20 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl items-start gap-3 max-w-[260px] animate-[bounce_4s_infinite] text-left">
          {/* Alterado de orange para purple aqui em baixo 👇 */}
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-500/50">
            <span className="text-sm">⚠️</span>
          </div>
          <div>
            <p className="text-white text-sm font-bold font-syne mb-1">Alerta de cobrança</p>
            <p className="text-gray-300 text-xs font-dm leading-relaxed">
              Identifiquei uma cobrança duplicada de R$ 34,90 no iFood. Deseja contestar?
            </p>
          </div>
        </div>

        {/* CARD FLUTUANTE 2 (Direita Baixo) - Agora Rosa */}
        <div className="hidden md:flex absolute -right-8 bottom-20 z-20 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl items-start gap-3 max-w-[260px] animate-[bounce_5s_infinite] text-left" style={{ animationDelay: '1s' }}>
          {/* Alterado de green para pink aqui em baixo 👇 */}
          <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center shrink-0 border border-pink-500/50">
            <span className="text-sm">💡</span>
          </div>
          <div>
            <p className="text-white text-sm font-bold font-syne mb-1">Meta próxima!</p>
            <p className="text-gray-300 text-xs font-dm leading-relaxed">
              Sua reserva de emergência está 80% concluída. Faltam apenas R$ 450.
            </p>
          </div>
        </div>

        {/* O Mockup original do Dashboard */}
        <div className="relative z-10 w-full">
          <DashboardMockup />
        </div>

      </div>
    </section>
  );
}