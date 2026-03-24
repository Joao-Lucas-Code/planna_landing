import Link from 'next/link';

export default function Obrigado() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-[5%] py-12 relative overflow-hidden">
      
      {/* Efeito de luz no fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 animate-fade-in w-full max-w-2xl mt-8">
        <span className="text-6xl mb-6 block">🎉</span>
        <h1 className="font-syne font-extrabold text-4xl md:text-6xl mb-6">
          Você está na lista VIP!
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto mb-12 font-dm">
          Seu lugar está garantido. Assim que o Planna.AI for liberado, você será um dos primeiros a receber o acesso antecipado e seus <span className="text-white font-bold">14 dias grátis</span>.
        </p>

        {/* --- SEÇÃO DOS CRIADORES --- */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-10 backdrop-blur-sm text-left">
          <div className="text-center mb-8">
            <h3 className="font-syne font-bold text-xl text-white">Conheça os criadores</h3>
            <p className="text-gray-500 text-sm mt-1">Acompanhe o desenvolvimento do projeto</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center md:items-start">
            
            {/* Perfil João Lucas */}
            <div className="flex flex-col items-center md:w-1/2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold font-syne text-xl mb-3 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                JL
              </div>
              <h4 className="text-white font-bold text-lg">João Lucas</h4>
              <p className="text-gray-400 text-xs mb-4">Desenvolvedor</p>
              
              <div className="flex gap-4">
                <a href="https://github.com/Joao-Lucas-Code" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="GitHub">
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href="https://www.linkedin.com/in/joaogomes6/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors" title="LinkedIn">
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://www.instagram.com/jolito6__/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition-colors" title="Instagram">
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>

            {/* Divisor Visual */}
            <div className="hidden md:block w-px h-28 bg-white/10 mt-2"></div>
            <div className="block md:hidden w-full h-px bg-white/10"></div>

            {/* Perfil Cauã */}
            <div className="flex flex-col items-center md:w-1/2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold font-syne text-xl mb-3 shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                CM
              </div>
              <h4 className="text-white font-bold text-lg">Cauã Mendes</h4>
              <p className="text-gray-400 text-xs mb-4">Desenvolvedor</p>
              
              <div className="flex gap-4">
                <a href="https://github.com/mendescaua00" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors" title="GitHub">
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href="https://www.linkedin.com/in/mendes-cau%C3%A3-/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors" title="LinkedIn">
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://www.instagram.com/mendescaua_/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition-colors" title="Instagram">
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              </div>
            </div>

          </div>
        </div>

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