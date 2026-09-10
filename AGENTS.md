# AGENTS.md — planna-landing-next

Guia para agentes de IA que trabalham neste repositório. Leia antes de mexer no código.

## Visão geral do projeto

Landing page de captação de leads (waitlist) para o **Planna.IA**, produto de gestão financeira com IA da **NovaFlow**. Domínio público: `https://novaflow.me`.

Esta landing é um **Next.js (App Router) com React 19**, escrita em **JavaScript** (não TypeScript — só `sitemap.ts`, `robots.ts` e `next.config.ts` são TS). Todo o conteúdo, copy e comentários estão em **português do Brasil** (`lang="pt-BR"`). O público e os comentários do código devem continuar em PT-BR.

O projeto é parte de uma plataforma maior (backend Django REST em outro repositório, hospedado em `novaflow-backend.onrender.com`; app web demo em `app.novaflow.me`). Esta landing só faz duas coisas dinâmicas:

1. **Formulário de waitlist** (`src/components/LeadForm.js`): INSERT direto no Supabase (tabela `cadastros_lp`) usando a anon key do browser, com fallback de tratamento de erro `23505`/409 (e-mail duplicado). Depois dispara um e-mail de boas-vindas em fire-and-forget para o backend e redireciona para `/obrigado`.
2. **Efeitos visuais do hero** (`src/components/HeroFlamingo.js`): flamingo cujos frames são percorridos pela **rolagem** (scroll scrub), com iluminação reativa ao cursor.

## Stack e arquitetura

- **Next.js 16** (App Router), **React 19**, **Tailwind CSS v4** via `@tailwindcss/postcss` (NÃO existe `tailwind.config.mjs` — os tokens vivem no bloco `@theme` de `src/app/globals.css`).
- **framer-motion** para animações (sempre via `MotionProvider` com `reducedMotion="user"` — ver abaixo).
- **@supabase/supabase-js** para o INSERT da waitlist.
- **@vercel/analytics** e **@vercel/speed-insights** (instalados no `layout.js`).
- **lucide-react** para ícones.
- Deploy na **Vercel** (o site roda em produção em `novaflow.me`).

### Estrutura de diretórios

```
src/
  app/                 # Rotas (App Router)
    page.js            # Home — monta as seções na ordem
    layout.js          # Fonts (Syne/DM Sans/JetBrains Mono), metadata, skip-link, Analytics
    globals.css        # DESIGN SYSTEM COMPLETO (ver abaixo)
    obrigado/page.js   # Página de agradecimento (noindex)
    sitemap.ts         # https://novaflow.me (sem /obrigado — é noindex)
    robots.ts
  components/          # Componentes de seção da landing, um por arquivo
    Navbar, Hero, HeroFlamingo, ProductPreview, Stats, Features,
    FeatureCard, Testimonials, Pricing, FAQ, LeadForm, Footer,
    FlamingoMark (marca vetorial), DashboardMockup, SectionIntro,
    TextoRevelado, MotionProvider
  lib/scrollTo.js      # Rolagem suave que respeita prefers-reduced-motion
                       # (único lugar onde a política de scroll vive)
  constants/theme.js   # DOCUMENTAÇÃO dos tokens — nenhum componente importa;
                       # a fonte de verdade em runtime é o @theme do globals.css
supabase/
  rls_cadastros_lp.sql # Políticas RLS da tabela de waitlist (aplicar no SQL Editor)
scripts/               # Utilitários one-off rodados com `node` (não são parte do build):
  generate-brand-assets.js  # Gera favicons/ícones PWA/OG image com sharp
  generate-og-image.js      # Gera public/og-image.png
  prepare-flamingo.js       # Pré-processa o render do flamingo (png -> webp)
  og-template.html
public/                # flamingo.webp, flamingo-scrub.mp4, flamingo.png, og-image.png, favicon/
.qa-screenshots/       # Artefatos de QA manual (não é teste automatizado)
```

## Comandos

```bash
npm run dev     # Servidor de desenvolvimento (porta 3000)
npm run build   # Build de produção
npm run start   # Serve o build
npm run lint    # ESLint (eslint-config-next, flat config do ESLint 9 —
                # config em eslint.config.mjs na raiz, com ignores de
                # .next/, node_modules/ e .qa-screenshots/)
```

Não há **nenhum teste automatizado** (nenhum framework de teste instalado). QA é manual — há um histórico de screenshots em `.qa-screenshots/`. Não invente comando de teste que não exista.

Os scripts de `scripts/` rodam com `node scripts/<nome>.js` e usam `sharp` (devida via `overrides` no `package.json`).

## Design system e convenções de estilo

O design system **inteiro** está em `src/app/globals.css`. Pontos críticos:

- **Tailwind v4**: tokens definidos em `@theme` viram utilitários automaticamente (`bg-canvas`, `text-ink`, `text-accent-soft`, `font-display`, `ease-out-expo`, …). Não criar `tailwind.config.mjs`.
- **Paleta**: pretos quentes (`canvas #0B0709`, `surface`, `raised`) + rosa flamingo (`accent #FF5C8A`, `accent-soft`, `accent-deep`). Verde/vermelho de dinheiro (`positive #10B981` / `negative #F87171`) são neutros de propósito — não sequestrá-los com a cor de marca.
- **Contraste WCAG AA é verificado e documentado** nos comentários de `globals.css` e `theme.js`. `ink-4` é SÓ decorativo ou texto grande (3.45:1). Ao mexer em cores, atualize os comentários de contraste.
- **Tipografia**: classes de componente no CSS (`.display-xl`, `.display-hero`, `.display-lg/md/sm`, `.mono-label`, `.mono-micro`, `.measure`, `.measure-wide`). Fontes via `next/font/google` no `layout.js` (Syne = display, DM Sans = texto, JetBrains Mono = microtexto).
- **Ritmo das seções**: a home alterna superfícies (canvas → surface → paper claro no Pricing) propositalmente — ver o comentário no topo de `src/app/page.js`. Manter essa alternância ao reordenar seções.
- **Texturas utilitárias**: `.grain`, `.blueprint`, `.vignette`, `.rule-fade`, `.hairline-*`. Sem orbs/glows genéricos — o projeto evita deliberadamente "look de template".
- **Movimento**: curto, deslocamento pequeno, curva `cubic-bezier(0.16, 1, 0.3, 1)` (`ease-out-expo`). Sem bounce, sem scale grande.

### Acessibilidade (é requisito, não opcional)

- **`MotionProvider`** envolve tudo com `reducedMotion="user"` — framer-motion não respeita `prefers-reduced-motion` sozinho. Qualquer animação nova deve manter esse contrato.
- Animações CSS próprias respeitam `prefers-reduced-motion` deixando o **estado final como padrão** (nunca um reset universal com `!important` — congela transições JS no meio do caminho; há comentário explicando isso no `globals.css`).
- `aria-live="polite"` no feedback do formulário, skip-link "Pular para o conteúdo" no `layout.js`, `:focus-visible` estilizado globalmente.
- A luz do cursor do flamingo fica ativa em `reduced-motion` de propósito (não desloca conteúdo). Ver a nota de política no `HeroFlamingo.js`.

### O palco do flamingo (pegadinha conhecida)

`HeroFlamingo.js` + as classes `.flamingo-palco`/`.fl-*` em `globals.css` dependem de `mix-blend-mode: screen`, que só enxerga o backdrop do **grupo isolado** mais próximo. **NENHUM ancestral dos elementos de mídia pode ter `transform`, `filter`, `opacity` animada ou `isolation`** — senão o fundo preto do vídeo reaparece como um retângulo em volta da ave. Paralaxe vai direto nas mídias, nunca num wrapper. Já houve exatamente esse bug; os comentários no CSS e no componente explicam o porquê.

**`position: sticky` também isola** (medido no navegador, não deduzido). Como o scrub exige o pin, o conserto foi dar ao grupo o fundo de que ele precisa: `.flamingo-palco::before` pinta uma elipse na cor do canvas por baixo da ave. **Não remova esse `::before` achando que é decoração** — sem ele a tarja preta volta. O núcleo opaco da elipse tem de conter a caixa inteira do palco, cantos inclusive.

Efeito colateral relacionado: a `<section id="hero">` usa **`overflow-x-clip`, não `overflow-hidden`**. `hidden` transforma a seção em contexto de rolagem e o `sticky` do trilho para de grudar.

### O scrub do flamingo

A ave vive em `.fl-trilho` (alto) com `.fl-fixo` sticky dentro. A fração do trilho já percorrida vira `currentTime` dos dois `<video>`. O clipe **nunca toca sozinho** — `play()` não é chamado em lugar nenhum.

Três coisas não óbvias, todas medidas:

- **O clipe precisa de GOP curto.** `currentTime = x` faz o decoder partir do keyframe anterior. A versão antiga tinha 1 keyframe em 145 frames e cada seek custava ~148 ms no Chrome. `public/flamingo-scrub.mp4` é encodado com `-g 8`, o que levou o seek para **14,4 ms na mediana / 21,2 ms no p95**. O comando completo e o porquê estão em `scripts/prepare-flamingo.js`.
- **Seeks não podem empilhar.** O rAF só emite um novo `currentTime` quando o anterior terminou (`!v.seeking`), senão a fila cresce e a ave arrasta atrás do scroll.
- **A preferência de movimento tem de ser observada, não lida uma vez.** O CSS reavalia a media query ao vivo; o JS não. Ler `matchMedia(...).matches` só na montagem produz um bug que parece impossível: quem liga "Efeitos de animação" no Windows com a página aberta vê os anéis d'água voltarem a animar (CSS) e a ave ficar parada para sempre (JS já decidiu não baixar o vídeo). `semMovimento` é estado com listener no `matchMedia`, e os efeitos dependem dele.

`--fl-curso` em `.fl-trilho` controla quantas telas de rolagem o clipe inteiro consome. Sob `prefers-reduced-motion` o trilho **colapsa** (senão sobrariam ~2,4 telas de rolagem vazia) e a ave volta para o fluxo normal, estática.

### Como medir o scrub (leia antes de tentar)

`page.screenshot()` do CDP **devolve estado congelado** nessa região — sempre em headless, às vezes em headful. Ele reporta "delta 0" mesmo com o vídeo tocando, o que leva direto à conclusão errada de que a página não repinta. O sinal de que você caiu nessa: o mesmo valor de delta aparecendo como constante em comparações diferentes.

Instrumentos que funcionam:

- **`requestVideoFrameCallback`** — dispara quando um frame é entregue ao compositor. É a prova de que a tela recebe frames novos (3 a 8 por trecho de rolagem, no scrub normal).
- **`drawImage(video)` + `getImageData`** — prova que o decoder entrega frames distintos.
- **Ler `currentTime` direto do DOM** — prova que o scrub acompanha a rolagem.

E dois detalhes de ambiente que já custaram horas:

- Aba em **background** (`document.visibilityState === 'hidden'`, o caso da aba controlada pela extensão do Chrome quando a janela está minimizada) suspende o pipeline de mídia inteiro e não roda `requestAnimationFrame`. Vídeo fica em `readyState 0` para sempre, sem erro. Não é bug do código.
- No puppeteer **headful**, `defaultViewport` descasa `window.innerHeight` do tamanho real da janela — e o progresso do scrub depende exatamente desse valor. Use `defaultViewport: null` com `--window-size`.

## Variáveis de ambiente

Definidas em `.env.local` (não commitado). Obrigatórias:

- `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` — usadas pelo `LeadForm.js`.
- `NEXT_PUBLIC_API_URL` — opcional; fallback hardcoded para `https://novaflow-backend.onrender.com` (endpoint `POST /api/leads/welcome/`).

Como a anon key é pública no browser, a segurança da tabela `cadastros_lp` depende do **RLS** — políticas em `supabase/rls_cadastros_lp.sql`: INSERT anônimo permitido, SELECT/UPDATE/DELETE bloqueados por omissão. Não criar policy de leitura para `anon`. Recomenda-se constraint unique em `email` (o formulário já trata o erro de violação).

## Convenções de código

- Componentes funcionais; seções da landing como default export com nome em PascalCase, um componente por arquivo, em `src/components/`.
- Imports com alias `@/` (configurado em `jsconfig.json`; `tsconfig.json` é usado pelo Next para checagem de tipos dos arquivos TS).
- Componentes com interatividade começam com `'use client'`.
- Comentários explicam o **porquê** (dívidas assumidas, bugs anteriores, decisões de design), frequentemente em blocos de várias linhas — siga esse padrão. Exemplos: a "dívida assumida" da paleta nova vs. app mobile antigo em `theme.js`, e as notas de empilhamento do flamingo.
- Animações de entrada em CSS puro (`.reveal` + `.d-1`…`.d-7`) em vez de framer-motion quando o markup precisa ser determinístico no SSR (evita mismatch de hidratação) — ver `src/app/obrigado/page.js`.
- Idioma: nomes de identificadores em inglês, strings de UI e comentários em PT-BR.

## Segurança

- Nunca commitar `.env.local` nem colocar service_role key em código client-side.
- Não adicionar endpoints de leitura de leads: leitura só via dashboard do Supabase ou backend com service_role key.
- E-mail é normalizado (`trim().toLowerCase()`) e validado por regex antes do INSERT.
- `/obrigado` é `noindex` (diluição de SEO evitada).

## Estado conhecido / dívidas

- **`src/constants/theme.js` não é importado por nada** — é documentação da identidade. Se mudar cores, atualize AMBOS (`@theme` no `globals.css` e o `theme.js`).
- A identidade rosa flamingo da landing diverge propositalmente da paleta violeta antiga (`#8B5CF6`) ainda usada pelo app mobile — decisão consciente, documentada em `theme.js`.
- README.md descreve a plataforma NovaFlow como um todo (backend Django etc.) — não descreve só este repo.
