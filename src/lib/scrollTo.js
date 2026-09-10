/**
 * Rolagem suave que respeita prefers-reduced-motion.
 *
 * Quem pediu menos movimento recebe o salto instantâneo (behavior 'auto'):
 * rolagem animada é, afinal, movimento — e a preferência pede exatamente
 * para não haver. Uso centralizado aqui para os três call sites da landing
 * (Navbar, Hero, Pricing) nao divergirem na politica.
 */
export function scrollTo(top) {
  const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top, behavior: reduz ? 'auto' : 'smooth' });
}
