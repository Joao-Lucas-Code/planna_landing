'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Flamingo do hero: vídeo em loop com iluminação direcional reativa ao mouse.
 *
 * COMO A LUZ FUNCIONA
 * Duas cópias empilhadas da mesma mídia. A de baixo recebe um filtro que a
 * rebaixa (sombra); a de cima recebe um filtro que a levanta (iluminada) e é
 * recortada por uma máscara radial posicionada no cursor. Onde a máscara é
 * opaca, o lado claro aparece — lado claro / lado escuro, ou seja volume, e
 * não um brilho colado por cima.
 *
 * POR QUE O RENDER TEM LUZ CHAPADA
 * De propósito. Luz forte queimada nos pixels brigaria com a luz que o CSS
 * acrescenta: sombra pintada à esquerda não sumiria ao levar o cursor para a
 * direita.
 *
 * COMO O FUNDO PRETO SOME
 * `mix-blend-mode: screen` — screen(preto, fundo) = fundo. Mas blend só
 * enxerga o backdrop dentro do contexto de empilhamento mais próximo, então
 * NENHUM ancestral aqui pode ter transform, filter, opacity animada ou
 * isolation. Foi exatamente esse erro que, numa versão anterior, deixou um
 * retângulo preto em volta da ave. Por isso o paralaxe e a flutuação vão
 * DIRETO nos elementos de mídia, nunca num wrapper.
 *
 * FALLBACK
 * O vídeo só recebe `src` depois da montagem, e só se houver permissão de
 * movimento. Sem isso ficam as imagens estáticas — que também é o markup do
 * servidor, evitando divergência de hidratação.
 */

const ESTATICO = '/flamingo.webp';
const VIDEO = '/flamingo-video.mp4';

export default function HeroFlamingo({ className = '' }) {
  const palcoRef = useRef(null);
  const sombraRef = useRef(null);
  const luzRef = useRef(null);
  const [temVideo, setTemVideo] = useState(false);

  // ---- Luz que segue o cursor -------------------------------------------
  useEffect(() => {
    const palco = palcoRef.current;
    if (!palco) return;

    const semMovimento = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Alvo e valor corrente separados para a luz chegar com inércia. Luz
    // pesada parece física; luz colada no cursor parece cursor customizado.
    let alvoX = 50;
    let alvoY = 30;
    let atualX = 50;
    let atualY = 30;
    let raf = 0;
    let vivo = true;

    // Deriva ligada a rolagem: a ave sobe e desbota conforme o hero sai de
    // cena. Movimento continuo dirigido pelo scroll le como vivo; disparo
    // unico ao entrar na viewport le como um slide trocando.
    // Vai por custom property, e nao por transform no palco — transform ali
    // criaria contexto de empilhamento e devolveria o retangulo preto.
    const derivaDoScroll = () => {
      const r = palco.getBoundingClientRect();
      const progresso = Math.min(Math.max(-r.top / (window.innerHeight * 0.9), 0), 1);
      palco.style.setProperty('--drift', `${(progresso * -70).toFixed(1)}px`);
      palco.style.setProperty('--fade', (1 - progresso * 0.75).toFixed(3));
    };

    const aplicar = () => {
      // A luz sempre acompanha o cursor.
      palco.style.setProperty('--lx', `${atualX.toFixed(2)}%`);
      palco.style.setProperty('--ly', `${atualY.toFixed(2)}%`);

      // Já o deslocamento do corpo, não.
      if (semMovimento) {
        palco.style.setProperty('--tilt', '0deg');
        palco.style.setProperty('--shift', '0px');
        palco.style.setProperty('--drift', '0px');
        palco.style.setProperty('--fade', '1');
        return;
      }

      palco.style.setProperty('--tilt', `${((atualX - 50) / 50) * 2.2}deg`);
      palco.style.setProperty('--shift', `${((atualX - 50) / 50) * -7}px`);
      derivaDoScroll();
    };

    // NOTA DE POLITICA — o que reduced-motion desliga aqui, e o que nao.
    //
    // Desliga: o loop de video, a flutuacao, a inclinacao de paralaxe, os
    // aneis de agua e a deriva de rolagem. Tudo isso move conteudo de lugar
    // ou toca sozinho, que e o alvo da preferencia.
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
      aplicar();
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
  }, []);

  // ---- Carga do vídeo e sincronia das duas trilhas -----------------------
  useEffect(() => {
    const sombra = sombraRef.current;
    const luz = luzRef.current;
    if (!sombra || !luz) return;

    // Respeita quem pediu menos movimento: sem vídeo, ficam as imagens.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // `src` entra só depois da montagem — o markup do servidor não tem vídeo,
    // então não há divergência de hidratação.
    //
    // A ordem aqui importa: com preload="none" o navegador não busca nada
    // até play() ser chamado. Esperar por `canplay` antes de dar play trava
    // os dois lados — canplay nunca dispara porque nada carrega. Então
    // promovemos o preload e chamamos play() direto; a troca visual espera
    // o evento `playing`.
    sombra.preload = 'auto';
    luz.preload = 'auto';
    sombra.src = VIDEO;
    luz.src = VIDEO;

    let raf = 0;
    let vivo = true;

    const aoTocar = () => {
      if (vivo && !sombra.paused && !luz.paused) setTemVideo(true);
    };

    // Autoplay pode ser recusado (economia de bateria, politica do
    // navegador). Nesse caso o catch silencia e as imagens permanecem.
    Promise.allSettled([sombra.play(), luz.play()]);

    // As duas trilhas são o mesmo arquivo, mas decodificam em ritmos
    // ligeiramente diferentes. Sem esta correção elas descolam e a camada
    // iluminada vira um fantasma deslocado do corpo.
    const sincronizar = () => {
      if (!vivo) return;
      if (Math.abs(luz.currentTime - sombra.currentTime) > 0.1) {
        luz.currentTime = sombra.currentTime;
      }
      raf = requestAnimationFrame(sincronizar);
    };
    raf = requestAnimationFrame(sincronizar);

    sombra.addEventListener('playing', aoTocar);
    luz.addEventListener('playing', aoTocar);

    return () => {
      vivo = false;
      cancelAnimationFrame(raf);
      sombra.removeEventListener('playing', aoTocar);
      luz.removeEventListener('playing', aoTocar);
    };
  }, []);

  const midiaBase = 'fl-midia';

  return (
    <div
      ref={palcoRef}
      className={`flamingo-palco ${temVideo ? 'tem-video' : ''} ${className}`}
      aria-hidden="true"
    >
      <div className="fl-cone" />

      {/* Estáticos: aparecem primeiro e permanecem se o vídeo não rodar */}
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

      {/* Vídeo: mesma dupla de camadas, mesmo tratamento de luz */}
      <video
        ref={sombraRef}
        className={`${midiaBase} fl-video fl-sombra`}
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
      />
      <video
        ref={luzRef}
        className={`${midiaBase} fl-video fl-luz`}
        muted
        loop
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
  );
}
