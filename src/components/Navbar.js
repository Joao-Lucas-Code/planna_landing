import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-[5%] py-5 bg-black/70 backdrop-blur-[18px] border-bottom border-white/10">
      <div className="font-syne font-extrabold text-xl tracking-tighter bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
        Planna.AI
      </div>
      
      <ul className="hidden md:flex gap-10 list-none">
        <li><Link href="#features" className="text-gray-400 text-sm hover:text-white transition-colors">Recursos</Link></li>
        <li><Link href="#pricing" className="text-gray-400 text-sm hover:text-white transition-colors">Preços</Link></li>
        <li><Link href="#testimonials" className="text-gray-400 text-sm hover:text-white transition-colors">Depoimentos</Link></li>
        <li><Link href="#faq" className="text-gray-400 text-sm hover:text-white transition-colors">FAQ</Link></li>
      </ul>

      <button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:300%_300%] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[100%_50%] transition-all duration-500">
        Começar grátis
      </button>
    </nav>
  );
}