'use client';

import { motion } from 'framer-motion';

/**
 * Cabecalho padrao de secao: indice numerado + regua + titulo.
 * Alinhado a esquerda por padrao — o "tudo centralizado" era o
 * principal vicio de template da versao anterior.
 */
export default function SectionIntro({
  index,
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}) {
  const centered = align === 'center';

  return (
    <div
      className={`${centered ? 'mx-auto text-center items-center' : 'items-start'} flex flex-col ${className}`}
    >
      {/* Indice + eyebrow + regua */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-center gap-4 ${centered ? 'justify-center' : ''} w-full`}
      >
        {index && (
          <span className="mono-micro text-accent-soft tabular shrink-0">
            {index}
          </span>
        )}
        <span className="mono-label text-ink-3 shrink-0">{eyebrow}</span>
        {!centered && <span className="h-px flex-1 rule-fade" />}
      </motion.div>

      {/* Titulo */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="display-lg text-ink mt-7 measure-wide"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-ink-2 text-base leading-relaxed measure"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
