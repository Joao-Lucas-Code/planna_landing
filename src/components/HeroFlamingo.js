'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Flamingo do hero: os frames do clipe sao percorridos pela ROLAGEM.
 *
 * COMO O SCRUB FUNCIONA
 * A ave vive num trilho alto (`.fl-trilho`). Dentro dele, `.fl-fixo` e
 * `position: sticky`, entao a ave gruda no centro da tela enquanto o trilho
 * passa. O quanto do trilho ja passou vira `currentTime` do video — rolar
 * para baixo adianta os frames, rolar para cima volta. O video NUNCA toca
 * sozinho: `play()` nao e chamado em lugar nenhum, o que tambem elimina a
 * recusa de autoplay como modo de falha.
 *
 * POR QUE O CLIPE TEM KEYFRAME A CADA 8 FRAMES
 * `currentTime = x` obriga o decoder a partir do keyframe anterior. O clipe
 * antigo tinha UM keyframe em 145 frames: cada salto refazia ate 145 frames
 * e custava ~148 ms medidos, ou seja ~7 fps de scrub. Com GOP 8 o decoder
 * volta no maximo 8 frames. O arquivo passou de 138 KB para 307 KB — e o
 * preco do scrub, e foi uma escolha deliberada.
 *
 * POR QUE NAO EMPILHAR SEEKS
 * O rAF so emite um novo `currentTime` quando o anterior terminou
 * (`!v.seeking`). Sem isso a fila de seeks cresce e a ave fica arrastando
 * atras do scroll. Como efeito colateral o scrub se auto-limita: se o seek
 * custar 16 ms saem ~60 atualizacoes/s; se custar 30 ms, ~33/s. Nunca
 * entope.
 *
 * COMO A LUZ FUNCIONA
 * Duas copias empilhadas da mesma midia. A de baixo recebe um filtro que a
 * rebaixa (sombra); a de cima recebe um filtro que a levanta (iluminada) e e
 * recortada por uma mascara radial posicionada no cursor. Onde a mascara e
 * opaca, o lado claro aparece — lado claro / lado escuro, ou seja volume, e
 * nao um brilho colado por cima.
 *
 * Sao dois decoders para o mesmo arquivo (o segundo sai do cache HTTP). Eles
 * decodificam em paralelo, entao o custo de wall-clock e o max() e nao a
 * soma. Se um dia isso pesar, o proximo passo e trocar a camada iluminada
 * por um <canvas> que desenha o mesmo video — um decoder so.
 *
 * COMO O FUNDO PRETO SOME
 * `mix-blend-mode: screen` — screen(preto, fundo) = fundo. Mas blend so
 * enxerga o backdrop do GRUPO ISOLADO mais proximo, entao nenhum ancestral
 * aqui pode ter transform, filter, opacity animada ou isolation. Foi
 * exatamente esse erro que, numa versao anterior, deixou um retangulo preto
 * em volta da ave. Por isso o paralaxe vai DIRETO nos elementos de midia,
 * nunca num wrapper.
 *
 * `position: sticky` TAMBEM isola — medido no navegador, nao deduzido: uma
 * div preta com screen dentro do sticky aparece preta, e some assim que o
 * sticky vira static. Como o pin e inegociavel para o scrub, a saida foi dar
 * ao grupo o fundo de que ele precisa: `.fl-fixo::before` pinta a cor do
 * canvas por baixo da ave (ver globals.css). Nao remova aquele ::before
 * achando que e decoracao — sem ele a tarja preta volta.
 *
 * FALLBACK
 * O video so recebe `src` depois da montagem, e so se houver permissao de
 * movimento. Sem isso ficam as imagens estaticas — que tambem e o markup do
 * servidor, evitando divergencia de hidratacao. Sob `prefers-reduced-motion`
 * o trilho colapsa por CSS (ver globals.css), entao nao sobra um buraco de
 * varias telas no lugar da animacao.
 */

const ESTATICO = '/flamingo.webp';
const VIDEO = '/flamingo-scrub.mp4';

// Frame a 24 fps. Serve de limiar: nao vale emitir um seek que cai dentro do
// frame que ja esta na tela.
const FRAME = 1 / 24;

export default function HeroFlamingo({ className = '' }) {
  const trilhoRef = useRef(null);
  const palcoRef = useRef(null);
  const sombraRef = useRef(null);
  const luzRef = useRef(null);
  const [temVideo, setTemVideo] = useState(false);

  // A preferencia de movimento e ESTADO, nao leitura unica na montagem.
  //
  // Ler uma vez parece bastar e nao basta: o CSS reavalia a media query ao
  // vivo, mas o JS nao. Quem liga "Efeitos de animacao" no Windows com a
  // pagina aberta via os aneis de agua voltarem a animar (CSS) enquanto a
  // ave ficava parada para sempre (JS ja tinha decidido nao baixar o video).
  // Sintoma exato relatado em desenvolvimento, e so um reload consertava.
  //
  // Comeca em `true` de proposito: o markup do servidor e o estatico, entao
  // hidratar com "sem movimento" nao diverge. O efeito abaixo corrige logo
  // apos a montagem.
  const [semMovimento, setSemMovimento] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const ler = () => setSemMovimento(mq.matches);
    ler();
    mq.addEventListener('change', ler);
    return () => mq.removeEventListener('change', ler);
  }, []);

  // ---- Luz do cursor + scrub da rolagem (um rAF so) ----------------------
  useEffect(() => {
    const palco = palcoRef.current;
    const trilho = trilhoRef.current;
    if (!palco || !trilho) return;

    // Alvo e valor corrente separados para a luz chegar com inercia. Luz
    // pesada parece fisica; luz colada no cursor parece cursor customizado.
    let alvoX = 50;
    let alvoY = 30;
    let atualX = 50;
    let atualY = 30;
    let raf = 0;
    let vivo = true;

    // Quanto do trilho ja passou, de 0 a 1. O curso e a altura do trilho
    // menos uma tela — exatamente o trecho em que o sticky fica grudado.
    const progresso = () => {
      const curso = trilho.offsetHeight - window.innerHeight;
      if (curso <= 0) return 0;
      const passou = -trilho.getBoundingClientRect().top;
      return Math.min(Math.max(passou / curso, 0), 1);
    };

    const escrubar = (p) => {
      const sombra = sombraRef.current;
      const luz = luzRef.current;
      if (!sombra || !luz || !sombra.duration) return;

      // Para um frame antes do fim: currentTime === duration rebobina para 0
      // em alguns navegadores, o que faria a ave piscar no fim do trilho.
      const alvo = p * (sombra.duration - FRAME);

      for (const v of [sombra, luz]) {
        if (v.seeking) continue;
        if (Math.abs(v.currentTime - alvo) > FRAME / 2) v.currentTime = alvo;
      }
    };

    // NOTA DE POLITICA — o que reduced-motion desliga aqui, e o que nao.
    //
    // Desliga: o carregamento do video, o scrub, a flutuacao, a inclinacao de
    // paralaxe e os aneis de agua. Tudo isso move conteudo sozinho ou por
    // rolagem, que e o alvo da preferencia. O trilho tambem colapsa no CSS,
    // entao a pagina fica com a ave estatica no fluxo normal.
    //
    // NAO desliga: a luz que segue o cursor. Ela nao desloca nada — muda
    // brilho e recorte em resposta a acao direta do usuario, mais perto de
    // um estado de hover do que de uma animacao. Cortar isso deixaria o hero
    // inteiramente morto para quem desliga animacoes do sistema (no Windows,
    // um unico botao em Acessibilidade > Efeitos visuais), que e um publico
    // grande e que nao pediu para perder interatividade.

    const loop = () => {
      if (!vivo) return;
      atualX += (alvoX - atualX) * 0.07;
      atualY += (alvoY - atualY) * 0.07;

      // A luz sempre acompanha o cursor.
      palco.style.setProperty('--lx', `${atualX.toFixed(2)}%`);
      palco.style.setProperty('--ly', `${atualY.toFixed(2)}%`);

      if (semMovimento) {
        palco.style.setProperty('--tilt', '0deg');
        palco.style.setProperty('--shift', '0px');
        palco.style.setProperty('--fade', '1');
      } else {
        palco.style.setProperty('--tilt', `${((atualX - 50) / 50) * 2.2}deg`);
        palco.style.setProperty('--shift', `${((atualX - 50) / 50) * -7}px`);

        const p = progresso();
        escrubar(p);

        // Desbota so nos ultimos 12% do trilho. Desbotar durante o scrub
        // esconderia justamente o que o usuario esta rolando para ver.
        const saida = Math.max(0, p - 0.88) / 0.12;
        palco.style.setProperty('--fade', (1 - saida * 0.7).toFixed(3));
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e) => {
      const r = palco.getBoundingClientRect();
      alvoX = ((e.clientX - r.left) / r.width) * 100;
      alvoY = ((e.clientY - r.top) / r.height) * 100;
    };
    const onLeave = () => {
      alvoX = 50;
      alvoY = 26;
    };

    const secao = palco.closest('section') || palco;
    secao.addEventListener('pointermove', onMove, { passive: true });
    secao.addEventListener('pointerleave', onLeave, { passive: true });

    return () => {
      vivo = false;
      cancelAnimationFrame(raf);
      secao.removeEventListener('pointermove', onMove);
      secao.removeEventListener('pointerleave', onLeave);
    };
  }, [semMovimento]);

  // ---- Carga do video ----------------------------------------------------
  useEffect(() => {
    const sombra = sombraRef.current;
    const luz = luzRef.current;
    if (!sombra || !luz) return;

    // Respeita quem pediu menos movimento: sem video, ficam as imagens.
    // Se a preferencia mudar depois, este efeito roda de novo (ver o estado
    // `semMovimento` acima) e o video entra sem precisar recarregar a pagina.
    if (semMovimento) return;

    // `src` entra so depois da montagem — o markup do servidor nao tem video,
    // entao nao ha divergencia de hidratacao.
    sombra.preload = 'auto';
    luz.preload = 'auto';
    sombra.src = VIDEO;
    luz.src = VIDEO;

    let vivo = true;

    // Espera HAVE_ENOUGH_DATA nas duas trilhas. Com readyState 2 da para
    // exibir o frame corrente, mas um salto para o fim do clipe ainda
    // engasga — e saltar para qualquer ponto e justamente o que o scrub faz.
    const conferir = () => {
      if (!vivo) return;
      if (sombra.readyState >= 4 && luz.readyState >= 4) setTemVideo(true);
    };

    sombra.addEventListener('canplaythrough', conferir);
    luz.addEventListener('canplaythrough', conferir);
    // O evento pode nao disparar se o clipe ja veio do cache.
    conferir();

    return () => {
      vivo = false;
      sombra.removeEventListener('canplaythrough', conferir);
      luz.removeEventListener('canplaythrough', conferir);
    };
  }, [semMovimento]);

  // Derivado, e nao mais um setTemVideo(false) dentro do efeito: se a
  // preferencia voltar para "menos movimento", a troca desliga sozinha, sem
  // um segundo render em cascata.
  const mostrarVideo = temVideo && !semMovimento;

  const midiaBase = 'fl-midia';

  return (
    <div ref={trilhoRef} className={`fl-trilho ${className}`}>
      <div className="fl-fixo">
        <div
          ref={palcoRef}
          className={`flamingo-palco ${mostrarVideo ? 'tem-video' : ''}`}
          aria-hidden="true"
        >
          <div className="fl-cone" />

          {/* Estaticos: aparecem primeiro e permanecem se o video nao carregar */}
          <img
            src={ESTATICO}
            alt=""
            width={619}
            height={1450}
            className={`${midiaBase} fl-estatico fl-sombra`}
            fetchPriority="high"
            decoding="async"
          />
          <img
            src={ESTATICO}
            alt=""
            width={619}
            height={1450}
            className={`${midiaBase} fl-estatico fl-luz`}
            decoding="async"
          />

          {/* Video: mesma dupla de camadas, mesmo tratamento de luz.
              Sem `loop` e sem `autoplay` — quem move o tempo e a rolagem. */}
          <video
            ref={sombraRef}
            className={`${midiaBase} fl-video fl-sombra`}
            muted
            playsInline
            preload="none"
            tabIndex={-1}
          />
          <video
            ref={luzRef}
            className={`${midiaBase} fl-video fl-luz`}
            muted
            playsInline
            preload="none"
            tabIndex={-1}
          />

          {/* Reflexo: imagem estatica espelhada, mesmo quando o video roda.
              O movimento do clipe e micro demais para alguem notar que o
              reflexo nao acompanha — e evita um quinto elemento de midia. */}
          <img
            src={ESTATICO}
            alt=""
            width={619}
            height={1450}
            className="fl-reflexo"
            decoding="async"
          />

          <div className="fl-poca" />
          <div className="fl-ondas">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
