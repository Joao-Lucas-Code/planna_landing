import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black py-12 px-[5%] mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Lado Esquerdo: Logo e Copyright */}
        <div className="flex flex-col gap-2 items-center md:items-start">
          <div className="font-syne font-extrabold text-xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Planna.AI
          </div>
          <p className="text-gray-500 text-xs">
            © 2025 Planna.AI · Todos os direitos reservados.
          </p>
        </div>

        {/* Lado Direito: Links */}
        <div className="flex gap-8 text-gray-400 text-xs">
          <Link href="#features" className="hover:text-white transition-colors">Recursos</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Preços</Link>
          <Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
          <Link href="mailto:contato@planna.ai" className="hover:text-white transition-colors">Contato</Link>
        </div>
      </div>
      
      {/* Aviso LGPD / Rodapé do Rodapé */}
      <div className="mt-10 pt-8 border-t border-white/5 text-center text-[10px] text-gray-600 max-w-2xl mx-auto leading-relaxed">
        O Planna.AI utiliza tecnologia de Open Finance para análise de dados. 
        Não realizamos movimentações financeiras ou custódia de valores. 
        Seus dados são protegidos conforme a Lei Geral de Proteção de Dados (LGPD).
      </div>
    </footer>
  );
}