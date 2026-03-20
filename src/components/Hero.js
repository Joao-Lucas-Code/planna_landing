import DashboardMockup from './DashboardMockup';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-[5%] pt-28 relative overflow-hidden">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-500 px-4 py-1.5 rounded-full text-[0.78rem] font-medium uppercase tracking-widest mb-8 animate-fade-up">
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
        Inteligência Artificial + Finanças
      </div>
      
      <h1 className="font-syne font-extrabold text-5xl md:text-8xl leading-[1.15] tracking-tight max-w-[960px] animate-fade-up animation-delay-200">
        O primeiro agente de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">IA</span> que realmente <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">entende seu dinheiro</span>
      </h1>

      <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-[560px] leading-relaxed animate-fade-up animation-delay-400">
        O Planna.AI analisa seus gastos, otimiza seus investimentos e entrega insights em tempo real — tudo numa interface intuitiva e poderosa.
      </p>

      <div className="mt-10 mb-16 flex gap-4 items-center animate-fade-up animation-delay-600">
        <button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 py-3 rounded-xl font-medium shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:scale-105 transition-transform">
          Começar grátis →
        </button>
        <button className="px-8 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all">
          Ver como funciona
        </button>
      </div>

      {/* Mockup posicionado no final do Hero */}
      <DashboardMockup />
    </section>
  );
}