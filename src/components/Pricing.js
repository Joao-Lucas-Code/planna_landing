'use client';

import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import TextoRevelado from './TextoRevelado';
import { scrollTo } from '@/lib/scrollTo';

// Matriz unica de recursos: os dois planos sao comparados linha a linha,
// como uma tabela — nao como dois cards soltos com listas diferentes.
const RECURSOS = [
  ['Contas conectadas', '1 conta', 'Ilimitadas'],
  ['Categorização automática', true, true],
  ['Relatórios mensais', true, true],
  ['IA avançada de insights', false, true],
  ['Alertas preditivos', false, true],
  ['Análise de investimentos', false, true],
];

const PLANOS = [
  {
    name: 'Starter',
    price: 'Grátis',
    period: 'para sempre',
    desc: 'Ideal para quem está começando a organizar as contas.',
    cta: 'Começar agora',
    featured: false,
  },
  {
    name: 'Pro',
    price: 'R$ 9,90',
    period: '/mês',
    desc: 'Para quem quer controle total e a IA trabalhando junto.',
    cta: 'Teste 14 dias grátis',
    featured: true,
  },
];

/** Celula da matriz: texto, check ou traço. */
function Celula({ valor, forte }) {
  if (valor === true) {
    return (
      <Check
        size={15}
        strokeWidth={2}
        className={forte ? 'text-accent-deep' : 'text-ink-inv/70'}
      />
    );
  }
  if (valor === false) {
    return <Minus size={15} strokeWidth={1.5} className="text-ink-inv/25" />;
  }
  return (
    <span className="text-[13px] text-ink-inv/75 tabular">{valor}</span>
  );
}

export default function Pricing() {
  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    scrollTo(y);
  };

  return (
    // Secao invertida: papel claro. Quebra a monotonia do escuro e faz a
    // oferta ser o momento mais luminoso da pagina.
    <section
      id="pricing"
      className="relative bg-paper text-ink-inv py-28 md:py-40 scroll-mt-20"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Cabecalho na versao clara */}
        <div className="flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 w-full"
          >
            <span className="mono-micro text-accent-deep tabular shrink-0">03</span>
            <span className="mono-label text-ink-inv-2 shrink-0">Planos</span>
            <span className="h-px flex-1 bg-gradient-to-r from-ink-inv/15 to-transparent" />
          </motion.div>

          <TextoRevelado
            className="display-lg mt-7 measure-wide"
            atraso={0.08}
            segmentos={[{ texto: 'Simples e transparente' }]}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-ink-inv-2 text-base leading-relaxed measure"
          >
            Sem taxa de setup, sem fidelidade e sem cartão de crédito para
            testar. Você troca de plano quando quiser.
          </motion.p>
        </div>

        {/* ---------- Tabela de planos ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 md:mt-20 border-t border-ink-inv/15"
        >
          {/* Cabecalho dos planos */}
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr]">
            <div className="hidden md:block border-r border-ink-inv/15 py-9 pr-8">
              <span className="mono-micro text-ink-inv-2">Comparativo</span>
            </div>

            {PLANOS.map((plano) => (
              <div
                key={plano.name}
                className={`py-9 px-0 md:px-8 border-b md:border-b-0 border-ink-inv/15 ${
                  plano.featured
                    ? 'bg-ink-inv/[0.035] md:border-r-0'
                    : 'border-r border-ink-inv/15'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="mono-label text-ink-inv">{plano.name}</span>
                  {plano.featured && (
                    <span className="mono-micro text-accent-deep border border-accent-deep/30 rounded-full px-2 py-0.5">
                      Recomendado
                    </span>
                  )}
                </div>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-display font-bold text-[2.25rem] leading-none tracking-[-0.04em] tabular">
                    {plano.price}
                  </span>
                  <span className="text-[13px] text-ink-inv-2">
                    {plano.period}
                  </span>
                </div>

                <p className="mt-4 text-[13px] text-ink-inv-2 leading-relaxed max-w-[30ch]">
                  {plano.desc}
                </p>

                <button
                  onClick={scrollToWaitlist}
                  className={`group mt-7 w-full h-11 rounded-sm text-[0.875rem] font-medium transition-all duration-400 cursor-pointer inline-flex items-center justify-center gap-2 ${
                    plano.featured
                      ? 'bg-ink-inv text-paper hover:bg-accent-deep'
                      : 'border border-ink-inv/25 text-ink-inv hover:border-ink-inv hover:bg-ink-inv/[0.04]'
                  }`}
                >
                  {plano.cta}
                  <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                    →
                  </span>
                </button>
              </div>
            ))}
          </div>

          {/* Linhas de recursos */}
          <div className="border-t border-ink-inv/15">
            {/* Cascata linha a linha, varrida da esquerda: gesto de tabela,
                nao de card. O olho desce a lista na ordem em que vai le-la. */}
            {RECURSOS.map(([label, starter, pro], i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group grid grid-cols-[1fr_auto_auto] md:grid-cols-[1.2fr_1fr_1fr] border-b border-ink-inv/10 last:border-b-0 transition-colors duration-300 hover:bg-ink-inv/[0.045]"
              >
                <div className="py-4 pr-4 md:pr-8 md:border-r border-ink-inv/15 flex items-center">
                  <span className="text-[13px] text-ink-inv/80 transition-transform duration-300 group-hover:translate-x-1">
                    {label}
                  </span>
                </div>

                <div className="py-4 px-4 md:px-8 md:border-r border-ink-inv/15 flex items-center justify-center md:justify-start min-w-[64px]">
                  <Celula valor={starter} />
                </div>

                <div
                  className={`py-4 px-4 md:px-8 flex items-center justify-center md:justify-start min-w-[64px] ${
                    i % 2 === 0 ? 'bg-ink-inv/[0.035]' : 'bg-ink-inv/[0.02]'
                  }`}
                >
                  <Celula valor={pro} forte />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <p className="mt-8 mono-micro text-ink-inv-2">
          Preços em BRL · Cancele quando quiser
        </p>
      </div>
    </section>
  );
}
