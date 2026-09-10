# CLAUDE.md

**O guia deste repositório é o [`AGENTS.md`](./AGENTS.md). Leia antes de mexer no código.**

Este arquivo existe só porque o Claude Code carrega `CLAUDE.md` automaticamente e
`AGENTS.md` não. Todo o conteúdo — stack, design system, convenções, segurança e
dívidas conhecidas — vive lá, num arquivo só, para não haver duas versões da
verdade se desencontrando. Não copie trechos do `AGENTS.md` para cá.

## O mínimo para não quebrar nada

- **Idioma:** UI, copy e comentários em **pt-BR**; identificadores em inglês.
- **Tailwind v4:** os tokens vivem no bloco `@theme` de `src/app/globals.css`.
  Não existe `tailwind.config.mjs` e não se deve criar um.
- **Não há teste automatizado.** QA é manual. Não invente comando de teste.
  Antes de dar por pronto: `npm run lint` e `npm run build`.
- **Acessibilidade é requisito.** Toda animação nova respeita
  `prefers-reduced-motion` — e **observando** a media query, não lendo uma vez
  na montagem (ver "O scrub do flamingo" no `AGENTS.md`).

## As três armadilhas que mais custaram tempo

Todas com o detalhe completo no `AGENTS.md`:

1. **O blend do flamingo.** `mix-blend-mode: screen` só enxerga o backdrop do
   grupo isolado mais próximo. `transform`, `filter`, `opacity` animada,
   `isolation` — e **`position: sticky`** — isolam, e a tarja preta do vídeo
   volta em volta da ave. Existe um `.flamingo-palco::before` que só está lá
   para consertar isso; não o remova achando que é decoração.
2. **`overflow-hidden` mata `position: sticky`.** A `<section id="hero">` usa
   `overflow-x-clip` por causa disso.
3. **Medir o scrub por screenshot dá resultado falso.** O `page.screenshot()`
   do CDP devolve estado congelado nessa região. Use
   `requestVideoFrameCallback`. A seção "Como medir o scrub" no `AGENTS.md`
   lista os instrumentos que funcionam e os que mentem.
