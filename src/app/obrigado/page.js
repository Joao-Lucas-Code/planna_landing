import Link from 'next/link';

export default function Obrigado() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-[5%] relative overflow-hidden">
      
      {/* Efeito de luz no fundo para manter a identidade visual */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 animate-fade-in">
        <span className="text-6xl mb-6 block">🎉</span>
        <h1 className="font-syne font-extrabold text-4xl md:text-6xl mb-6">
          Você está na lista VIP!
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto mb-10 font-dm">
          Seu lugar está garantido. Assim que o Planna.AI for liberado, você será um dos primeiros a receber o acesso antecipado e seus <span className="text-white font-bold">14 dias grátis</span>.
        </p>

        {/* Botão para voltar */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-3 rounded-xl hover:bg-white/10 transition-colors font-medium"
        >
          ← Voltar para o início
        </Link>
      </div>
    </main>
  );
}