export default function CTA() {
  return (
    <section id="cta" className="relative py-32 px-5 text-center overflow-hidden">
      {/* O brilho roxo ao fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/10 blur-[120px] pointer-events-none" />
      
      <div className="relative z-10">
        <span className="text-blue-500 text-[10px] uppercase tracking-[0.2em] font-bold">Comece Agora</span>
        <h2 className="font-syne font-extrabold text-4xl md:text-6xl mt-6 mb-8 tracking-tighter">
          Seu dinheiro merece <br/> inteligência de verdade
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg">
          Junte-se a mais de 12.000 pessoas que já transformaram sua vida financeira com o Planna.AI.
        </p>
        
        <button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(139,92,246,0.3)]">
          Criar conta gratuita →
        </button>
        
        <p className="mt-6 text-[11px] text-gray-500 italic">
          Gratuito para sempre no plano Starter · Sem cartão de crédito · Setup em 2 minutos
        </p>
      </div>
    </section>
  );
}