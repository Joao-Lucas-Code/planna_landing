'use client';

import { motion } from 'framer-motion';

/**
 * Revelação de texto de display palavra a palavra.
 *
 * Por que palavra e não bloco: um bloco inteiro que sobe é o mesmo gesto de
 * todas as outras seções, e gesto repetido para de ser lido como movimento.
 * A cascata por palavra acompanha a direção da leitura, então o movimento
 * conduz o olho em vez de apenas anunciar que algo apareceu.
 *
 * Cada palavra vive dentro de um invólucro com overflow oculto, de modo que
 * ela sobe de trás da própria linha de base — recorte, não fade. Recorte lê
 * como tipografia; fade lê como slide de apresentação.
 *
 * Acessibilidade: a frase inteira fica num aria-label e os pedaços são
 * escondidos do leitor de tela, senão ele soletraria palavra por palavra.
 * Com "reduzir movimento", tudo nasce no estado final.
 */

const container = {
  oculto: {},
  visivel: (atraso = 0) => ({
    transition: { staggerChildren: 0.045, delayChildren: atraso },
  }),
};

const palavra = {
  oculto: { y: '110%' },
  visivel: {
    y: '0%',
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function TextoRevelado({
  segmentos,
  className = '',
  as: Tag = 'h2',
  atraso = 0,
}) {
  const frase = segmentos.map((s) => s.texto).join(' ');
  const MotionTag = motion[Tag] || motion.h2;

  return (
    <MotionTag
      className={className}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: '-90px' }}
      variants={container}
      custom={atraso}
      aria-label={frase}
    >
      {segmentos.map((seg, i) => (
        <span key={i} className={seg.className || undefined}>
          {seg.texto.split(' ').map((p, j) => (
            <span
              key={j}
              aria-hidden="true"
              // O invólucro recorta; o filho é quem se move.
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                verticalAlign: 'bottom',
                paddingBottom: '0.08em',
                marginBottom: '-0.08em',
              }}
            >
              <motion.span
                variants={palavra}
                style={{ display: 'inline-block', willChange: 'transform' }}
              >
                {p}
              </motion.span>
              {' '}
            </span>
          ))}
        </span>
      ))}
    </MotionTag>
  );
}
