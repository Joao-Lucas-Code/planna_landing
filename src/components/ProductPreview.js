'use client';

import { motion } from 'framer-motion';
import DashboardMockup from './DashboardMockup';

/**
 * Faixa de produto: o mockup do dashboard saiu do hero quando o flamingo
 * virou a peça central, mas continua sendo a prova de que existe produto
 * atrás da marca. Fica logo abaixo, sem índice numerado — não é uma seção
 * do argumento, é a evidência dele.
 */
export default function ProductPreview() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Section sem titulo visual: o h2 fica so para leitores de tela —
            toda <section> precisa de cabecalho acessivel */}
        <h2 className="sr-only">O produto</h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4"
        >
          <span className="mono-label text-ink-3 shrink-0">O produto</span>
          <span className="h-px flex-1 rule-fade" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-5xl mx-auto"
        >
          <DashboardMockup />
        </motion.div>

        <p className="mt-8 text-center mono-micro text-ink-3">
          Visão geral · dados ilustrativos
        </p>
      </div>
    </section>
  );
}
