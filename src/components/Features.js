'use client';

import { motion } from 'framer-motion';
import { BarChart3, Rocket, Target } from 'lucide-react';
import FeatureCard from './FeatureCard';
import SectionIntro from './SectionIntro';

const featuresData = [
  {
    icon: BarChart3,
    index: '01',
    title: 'Análise de Gastos',
    description:
      'Categorização automática de todas as suas transações com insights personalizados.',
    backTitle: 'Economia inteligente',
    backContent:
      'A IA identificou que você pode economizar R$ 280 trocando pedidos de delivery por refeições em casa.',
  },
  {
    icon: Rocket,
    index: '02',
    title: 'Otimização',
    description:
      'Recomendações de portfólio baseadas no seu perfil de risco e metas.',
    backTitle: 'Projeção de patrimônio',
    backContent:
      'Com os ajustes sugeridos, você pode terminar o ano com R$ 1.500 a mais investidos.',
  },
  {
    icon: Target,
    index: '03',
    title: 'Metas',
    description:
      'Defina objetivos financeiros e deixe a IA traçar o caminho mais eficiente.',
    backTitle: 'Viagem Europa 2025',
    backContent:
      'Faltam apenas R$ 1.200. Mantendo o ritmo atual, você atinge a meta em 3 meses.',
  },
];

// Visual do card grande: quebra de gastos por categoria
const CATEGORIAS = [
  ['Moradia', 38, false],
  ['Alimentação', 27, true],
  ['Transporte', 15, false],
  ['Lazer', 12, false],
  ['Outros', 8, false],
];

function BreakdownCategorias() {
  return (
    <div className="flex flex-col gap-3.5">
      {CATEGORIAS.map(([nome, pct, destaque], i) => (
        <div key={nome} className="flex items-center gap-4">
          <span className="mono-micro text-ink-3 w-[88px] shrink-0 truncate">
            {nome}
          </span>
          <div className="flex-1 h-[3px] bg-ink/[0.06] rounded-full overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 1,
                delay: 0.15 + i * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ width: `${pct}%`, transformOrigin: 'left' }}
              className={`h-full rounded-full ${
                destaque ? 'bg-accent-soft' : 'bg-ink-3'
              }`}
            />
          </div>
          <span className="mono-micro text-ink-4 tabular w-8 text-right shrink-0">
            {pct}%
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Features() {
  const [principal, ...secundarios] = featuresData;

  return (
    <section id="features" className="relative py-28 md:py-40 scroll-mt-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionIntro
          index="01"
          eyebrow="Recursos"
          title="Tudo sob controle, sem virar planilha"
          description="Três camadas de inteligência trabalhando sobre os mesmos dados: o que você gastou, o que você tem e onde você quer chegar."
        />

        {/* Bento assimetrico: um card dominante + dois de apoio.
            Grade 3x3 igual era o que mais denunciava o template. */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 lg:row-span-2 flex"
          >
            <FeatureCard {...principal} className="w-full">
              <BreakdownCategorias />
            </FeatureCard>
          </motion.div>

          {secundarios.map((feat, index) => (
            <motion.div
              key={feat.index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.8,
                delay: 0.1 + index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="lg:col-span-5 flex"
            >
              <FeatureCard {...feat} className="w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
