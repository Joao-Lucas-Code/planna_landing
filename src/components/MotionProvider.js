'use client';

import { MotionConfig } from 'framer-motion';

/**
 * O framer-motion NAO respeita prefers-reduced-motion por conta própria —
 * é preciso dizer. Sem isto, cada revelação por deslocamento ou recorte
 * espalhada pelas seções continua rodando para quem pediu menos movimento.
 *
 * `reducedMotion="user"` desliga animações de transform e de layout quando a
 * preferência está ativa, preservando as de opacidade — que não causam
 * desconforto vestibular e ainda comunicam que algo entrou.
 */
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
