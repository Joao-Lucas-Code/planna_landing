// PLANNA.IA — Tokens de tema (fonte de verdade, alinhados com o app mobile)
// Os componentes usam classes Tailwind; este arquivo documenta os valores
// oficiais da paleta e deve ser referenciado em estilos inline/arbitrários.
//
// Mapeamento Tailwind mais próximo:
//   brand #8B5CF6        -> violet-500
//   brandGradient        -> from-blue-500 to-violet-500 (APENAS 2 cores)
//   aiAccent #A78BFA     -> violet-400
//   money/success #10B981-> emerald-500
//   error #EF4444        -> red-500
//   warning #F59E0B      -> amber-500
//   textPrimary #FAFAFA  -> zinc-50
//   textSecondary #A1A1AA-> zinc-400
//   textMuted #52525B    -> zinc-600
//   border               -> white/[0.08]

export const theme = {
  bgPrimary: '#09090B',
  bgCard: '#131316',
  bgElevated: '#1C1C21',
  brand: '#8B5CF6',
  brandGradient: ['#3B82F6', '#8B5CF6'],
  aiAccent: '#A78BFA',
  money: '#10B981',
  textPrimary: '#FAFAFA',
  textSecondary: '#A1A1AA',
  textMuted: '#52525B',
  border: 'rgba(255,255,255,0.08)',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
};

export default theme;
