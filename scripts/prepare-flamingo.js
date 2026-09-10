// Prepara o render do flamingo para o hero:
// corta a moldura preta, redimensiona e grava um canal alpha derivado da
// luminancia — o gerador entrega JPEG sem transparencia.
//
// Uso: node scripts/prepare-flamingo.js
// Entrada: public/flamingo.png (render bruto)  Saida: public/flamingo.webp
//
// O VIDEO do hero e comprimido a parte, uma unica vez, e nao precisa do
// ffmpeg como dependencia do projeto. O comando atual:
//
//   ffmpeg -i bruto.mp4 -map 0:v:0 -an -vf "crop=444:998:186:86"
//     -c:v libx264 -crf 30 -preset veryslow -profile:v high -pix_fmt yuv420p
//     -g 8 -keyint_min 8 -x264-params "keyint=8:min-keyint=8:scenecut=0"
//     -movflags +faststart public/flamingo-scrub.mp4
//
// 1.15 MB -> 307 KB com PSNR de 39.6 dB (visualmente sem perda). VP9/WebM foi
// testado e saiu MAIOR (288 KB) neste clipe curto, alem de nao cobrir Safari
// antigo — por isso ficou so o H.264.
//
// AS DUAS PARTES QUE NAO SAO OBVIAS:
//
// `-g 8` (keyframe a cada 8 frames) existe porque o hero faz SCRUB: a
// rolagem escreve `currentTime`, e cada salto obriga o decoder a partir do
// keyframe anterior. A versao antiga tinha UM keyframe em 145 frames e cada
// seek custava ~148 ms medidos no Chrome — inutilizavel. GOP 8 custa 2.2x em
// bytes (138 KB -> 307 KB) e foi o meio-termo escolhido; GOP 4 daria 480 KB e
// all-intra 835 KB, sem ganho perceptivel de fluidez.
//
// `crop=444:998:186:86` e a UNIAO do bounding box da ave nos 145 frames, com
// 6 px de margem. Sem o corte o video vinha com tarja preta lateral e a ave
// aparecia 15% menor que o .webp estatico — dava um pulo visivel no instante
// em que o video substituia a imagem. O `aspect-ratio` de `.flamingo-palco`
// no globals.css segue este recorte; se reencodar com outro crop, atualize
// os dois.

const sharp = require('sharp');
const path = require('path');

const ENTRADA = path.join(__dirname, '..', 'public', 'flamingo.png');
const SAIDA = path.join(__dirname, '..', 'public', 'flamingo.webp');
const LARGURA = 880;

async function main() {
  const cortado = await sharp(ENTRADA)
    .trim({ threshold: 12 })
    .resize({ width: LARGURA, withoutEnlargement: true })
    .toBuffer();

  const { width, height } = await sharp(cortado).metadata();

  // linear(12, -72) => alpha = 12*luminancia - 72.
  // Zera abaixo de 6 (o fundo preto) e satura em ~27, o que preserva a
  // ponta escura do bico em vez de apaga-la junto com o fundo.
  const alpha = await sharp(cortado)
    .greyscale()
    .linear(12, -72)
    .toColourspace('b-w')
    .raw()
    .toBuffer();

  const rgb = await sharp(cortado).removeAlpha().raw().toBuffer();

  await sharp(rgb, { raw: { width, height, channels: 3 } })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .webp({ quality: 88, effort: 6, alphaQuality: 92 })
    .toFile(SAIDA);

  console.log(`✓ flamingo.webp ${width}x${height} com alpha`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
