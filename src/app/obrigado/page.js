import Link from 'next/link';

export default function Obrigado() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-[5%] relative overflow-hidden">
      
      {/* Efeito de luz no fundo para manter a identidade visual */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 animate-fade-in">
        <span className="text-6xl mb-6 block">🎉</span>
        <h1 className="font-syne font-extrabold text-4xl md:text-6xl mb-6">
          Acesso VIP Liberado!
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto mb-10 font-dm">
          Temos uma surpresa: a versão Beta do <span className="text-white font-bold">NovaFlow</span> acabou de sair do forno! Como você está na lista VIP, seus <span className="text-white font-bold">14 dias grátis</span> já estão disponíveis para uso imediato.
        </p>

        {/* Grupo de Botões */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          
          {/* Botão Principal - Leva direto pro App */}
          <a 
            href="https://app.novaflow.me/register" 
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 transition-all font-bold text-lg shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] scale-100 hover:scale-105"
          >
            Criar Conta e Acessar Agora 🚀
          </a>

          {/* Botão Secundário - Volta pro início */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-colors font-medium"
          >
            Voltar para o início
          </Link>
          
        </div>
      </div>
    </main>
  );
}