'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  { id: 'features', label: 'Recursos' },
  { id: 'testimonials', label: 'Clientes' },
  { id: 'pricing', label: 'Preços' },
  { id: 'faq', label: 'FAQ' },
];

export default function Navbar() {
  // A barra so ganha fundo depois que a pagina rola — no topo ela flutua
  // sobre o hero sem cortar a composicao.
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-[100] transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? 'bg-canvas/80 backdrop-blur-xl border-b border-hairline'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 h-16 flex items-center justify-between gap-8">
        {/* Wordmark — solido, com ponto de acento. Sem gradiente. */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-baseline gap-[3px] font-display font-extrabold text-[0.95rem] tracking-tight text-ink cursor-pointer"
          aria-label="Voltar ao topo"
        >
          Planna
          <span className="text-accent-soft">.IA</span>
        </button>

        {/* Navegacao desktop */}
        <ul className="hidden md:flex items-center gap-9 list-none">
          {LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollToSection(link.id)}
                className="mono-micro text-ink-3 hover:text-ink transition-colors duration-300 link-underline cursor-pointer"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection('waitlist')}
            className="group hidden sm:flex items-center gap-2.5 border border-hairline hover:border-ink/30 bg-ink/[0.02] hover:bg-ink/[0.06] px-4 h-9 rounded-sm transition-all duration-400 cursor-pointer"
          >
            <span className="mono-micro text-ink">Lista de espera</span>
            <span className="w-1 h-1 rounded-full bg-accent-soft" />
          </button>

          {/* Toggle mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col justify-center gap-[5px] w-9 h-9 items-center cursor-pointer"
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            <span
              className={`block h-px w-4 bg-ink transition-transform duration-300 ${
                open ? 'translate-y-[3px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-px w-4 bg-ink transition-transform duration-300 ${
                open ? '-translate-y-[3px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Painel mobile */}
      <div
        className={`md:hidden overflow-hidden border-t transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? 'max-h-80 border-hairline bg-canvas/95 backdrop-blur-xl'
            : 'max-h-0 border-transparent'
        }`}
      >
        <ul className="px-6 py-4 flex flex-col list-none">
          {LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollToSection(link.id)}
                className="w-full text-left py-3 border-b border-hairline-2 mono-label text-ink-2 hover:text-ink transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => scrollToSection('waitlist')}
              className="w-full text-left py-3 mono-label text-accent-soft cursor-pointer"
            >
              Entrar na lista →
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
