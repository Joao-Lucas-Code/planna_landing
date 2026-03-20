export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-[5%] mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-10">
        
        <div className="flex flex-col gap-3 items-center md:items-start">
          <div className="font-syne font-extrabold text-2xl tracking-tighter bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Planna.AI
          </div>
          <span className="text-gray-600 text-[11px]">
            © 2025 Planna.AI · Todos os direitos reservados
          </span>
        </div>

        <div className="flex gap-8 text-gray-500 text-xs font-medium">
          <a href="#" className="hover:text-white transition-colors">Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
          <a href="#" className="hover:text-white transition-colors">Blog</a>
          <a href="#" className="hover:text-white transition-colors">Contato</a>
        </div>
      </div>
    </footer>
  );
}