// PLANNA.IA — Tokens de tema (identidade flamingo)
//
// ATENÇÃO — DÍVIDA ASSUMIDA: estes valores são a identidade NOVA, aplicada na
// landing. O app mobile ainda usa a paleta violeta antiga (#8B5CF6). Até ele
// ser atualizado, quem sai da landing e entra no app vê duas marcas. Isso foi
// uma decisão consciente, não um esquecimento.
//
// Este arquivo é DOCUMENTAÇÃO: nenhum componente o importa. A fonte de verdade
// em runtime é o bloco @theme em src/app/globals.css, e os caminhos vetoriais
// da marca vivem em src/components/FlamingoMark.js.
//
// Mapeamento para os utilitários gerados pelo Tailwind v4:
//   accent      #FF5C8A -> bg-accent      / text-accent
//   accent-soft #FF8FB0 -> text-accent-soft (texto pequeno sobre escuro)
//   accent-deep #B01247 -> único seguro sobre o papel claro
//   flamingo    #FF5C8A -> text-flamingo (alias semântico da marca)
//
// Contraste verificado (WCAG AA):
//   accent      / canvas ....... 6.82:1  passa
//   accent-soft / canvas ....... 9.35:1  passa
//   accent-deep / paper ........ 6.50:1  passa
//   ink-2       / canvas ....... 7.41:1  passa
//   ink-3       / canvas ....... 5.06:1  passa
//   ink-4       / canvas ....... 3.45:1  SÓ decorativo ou texto grande

export const theme = {
  // Superfícies — pretos quentes. Sobre preto frio o rosa fica estridente.
  bgPrimary: '#0B0709',
  bgCard: '#120C10',
  bgElevated: '#1A1218',
  paper: '#FDF6F3',

  // Marca
  brand: '#FF5C8A',
  brandSoft: '#FF8FB0',
  brandDeep: '#B01247',
  beak: '#8E1E43',

  // Tinta
  textPrimary: '#FAF7F8',
  textSecondary: '#A79AA0',
  textMuted: '#8A7C86',
  textFaint: '#6E626A',
  border: 'rgba(255,255,255,0.09)',

  // Dados — verde e vermelho seguem neutros de propósito: dinheiro tem
  // convenção própria e não deve ser sequestrado pela cor de marca.
  money: '#10B981',
  success: '#10B981',
  error: '#F87171',
  warning: '#F59E0B',
};

export default theme;
