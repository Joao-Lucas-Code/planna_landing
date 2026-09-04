'use client';

import HeroFlamingo from './HeroFlamingo';
import TextoRevelado from './TextoRevelado';

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
      {/* Camadas de fundo: grade tecnica + vinheta. */}
      <div className="absolute inset-0 blueprint opacity-60 pointer-events-none" />
      <div className="absolute inset-0 vignette pointer-events-none" />
      {/* Desvanece a grade na base para a secao seguinte nao ter costura */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-canvas pointer-events-none" />

      {/* Sem z-index aqui de proposito: z-index cria contexto de empilhamento
          e isola o mix-blend-mode do flamingo dos fundos da secao, o que
          devolve um retangulo preto em volta da ave. `relative` sozinho ja
          garante a ordem de pintura. */}
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 pt-32 md:pt-40 pb-0">
        {/* Composicao centrada: o flamingo e o ponto focal e o texto o
            prepara. Centralizar aqui e uma escolha deliberada — o resto da
            pagina segue alinhado a esquerda, entao o hero destaca por
            contraste, e nao por inercia de template. */}
        <div className="flex flex-col items-center text-center">
          <div className="reveal inline-flex items-center gap-2.5 border border-hairline rounded-full pl-2.5 pr-4 py-1.5 bg-ink/[0.02]">
            <span className="w-1.5 h-1.5 rounded-full bg-flamingo" />
            <span className="mono-micro text-ink-3">
              Suas finanças em equilíbrio
            </span>
          </div>

          <TextoRevelado
            as="h1"
            className="display-hero text-ink mt-8 max-w-[19ch]"
            atraso={0.15}
            segmentos={[
              { texto: 'O primeiro agente de IA que realmente' },
              { texto: 'entende seu dinheiro', className: 'text-accent-soft' },
            ]}
          />

          <p className="reveal d-4 mt-7 text-ink-2 text-lg leading-relaxed measure">
            O Planna.IA analisa seus gastos, otimiza seus investimentos e
            entrega insights em tempo real — tudo numa interface intuitiva e
            poderosa.
          </p>

          <div className="reveal d-5 mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
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
              <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </button>

            <button
              onClick={scrollToWaitlist}
              className="mono-micro text-ink-2 hover:text-ink transition-colors duration-300 link-underline cursor-pointer"
            >
              14 dias grátis, sem cartão
            </button>
          </div>

          {/* ---------- O flamingo ---------- */}
          {/* Sem `reveal` aqui: a animacao de opacity criaria contexto de
              empilhamento e quebraria o blend. Sendo o elemento LCP, aparecer
              de imediato tambem e melhor. */}
          <div className="mt-16 md:mt-20 w-full flex justify-center">
            <HeroFlamingo />
          </div>

          {/* Convite discreto a interagir. Escondido onde nao ha cursor. */}
          <p className="reveal d-7 mt-10 mono-micro text-ink-4 hidden lg:block">
            Mova o cursor para acender
          </p>
        </div>
      </div>

      {/* ---------- Faixa de instituicoes ---------- */}
      <div className="relative z-10 mt-16 md:mt-20 border-y border-hairline bg-surface/40 backdrop-blur-sm">
        <div className="flex items-center">
          <span className="mono-micro text-ink-3 px-6 md:px-10 py-4 border-r border-hairline shrink-0 hidden sm:block">
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
