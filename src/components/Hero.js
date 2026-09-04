'use client';

import DashboardMockup from './DashboardMockup';

// Instituicoes citadas no FAQ — viram uma faixa de credibilidade em vez
// de uma barra de logos falsa.
const INSTITUICOES = [
  'Nubank', 'Itaú', 'Bradesco', 'Santander', 'Inter',
  'XP', 'BTG Pactual', 'C6 Bank', 'Caixa', 'Banco do Brasil',
];

export default function Hero() {
  const scrollToWaitlist = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById('waitlist');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden grain">
      {/* Camadas de fundo: grade tecnica + vinheta. Sem orbs borradas. */}
      <div className="absolute inset-0 blueprint opacity-70 pointer-events-none" />
      <div className="absolute inset-0 vignette pointer-events-none" />
      {/* Desvanece a grade na base para a secao seguinte nao ter costura */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-canvas pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10 pt-32 pb-0 md:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 items-center">
          {/* ---------- Coluna de texto ---------- */}
          <div className="lg:col-span-6">
            <div className="reveal flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-soft" />
              <span className="mono-micro text-ink-3">
                Inteligência Artificial · Open Finance
              </span>
            </div>

            <h1 className="reveal d-2 display-hero text-ink mt-8">
              O primeiro agente de IA que realmente{' '}
              <span className="text-accent-soft">entende seu dinheiro</span>
            </h1>

            <p className="reveal d-4 mt-8 text-ink-2 text-lg leading-relaxed measure">
              O Planna.IA analisa seus gastos, otimiza seus investimentos e
              entrega insights em tempo real — tudo numa interface intuitiva e
              poderosa.
            </p>

            {/* Acoes: uma primaria solida, uma secundaria em texto.
                Nada de dois botoes com o mesmo peso visual. */}
            <div className="reveal d-5 mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
              <button
                onClick={scrollToWaitlist}
                className="group relative inline-flex items-center gap-3 bg-ink text-ink-inv h-12 px-7 rounded-sm overflow-hidden cursor-pointer"
              >
                <span className="relative z-10 text-[0.9rem] font-medium">
                  Entrar na lista de espera
                </span>
                <span className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                  →
                </span>
                {/* Preenchimento de acento que sobe no hover */}
                <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="absolute inset-0 z-[5] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button
                onClick={scrollToWaitlist}
                className="mono-micro text-ink-2 hover:text-ink transition-colors duration-300 link-underline cursor-pointer"
              >
                14 dias grátis, sem cartão
              </button>
            </div>

            {/* Linha de metadados — densidade de informacao em vez de vazio */}
            <dl className="reveal d-6 mt-14 grid grid-cols-3 gap-px bg-hairline border-y border-hairline">
              {[
                ['2.000+', 'Na lista'],
                ['AES-256', 'Criptografia'],
                ['Read-only', 'Acesso'],
              ].map(([value, label]) => (
                <div key={label} className="bg-canvas py-4 pr-4">
                  <dt className="display-sm text-ink tabular">{value}</dt>
                  <dd className="mono-micro text-ink-3 mt-1.5">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ---------- Coluna do produto ----------
              Sangra para fora da direita no desktop: a composicao deixa de
              ser um retangulo centralizado e ganha tensao. */}
          <div className="reveal d-4 lg:col-span-6 lg:-mr-[5vw] xl:-mr-[7vw]">
            <DashboardMockup />
          </div>
        </div>
      </div>

      {/* ---------- Faixa de instituicoes ---------- */}
      <div className="relative z-10 mt-16 md:mt-24 border-y border-hairline bg-surface/40 backdrop-blur-sm">
        <div className="flex items-center">
          <span className="mono-micro text-ink-4 px-6 md:px-10 py-4 border-r border-hairline shrink-0 hidden sm:block">
            Conecta com
          </span>
          <div className="flex-1 overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <div className="marquee-track flex w-max gap-12 pl-12">
              {[...INSTITUICOES, ...INSTITUICOES].map((nome, i) => (
                <span
                  key={i}
                  className="mono-micro text-ink-3 whitespace-nowrap shrink-0"
                  aria-hidden={i >= INSTITUICOES.length}
                >
                  {nome}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
