// Prepara o render do flamingo para o hero:
// corta a moldura preta, redimensiona e grava um canal alpha derivado da
// luminancia — o gerador entrega JPEG sem transparencia.
//
// Uso: node scripts/prepare-flamingo.js
// Entrada: public/flamingo.png (render bruto)  Saida: public/flamingo.webp
//
// O VIDEO do hero e comprimido a parte, uma unica vez, e nao precisa do
// ffmpeg como dependencia do projeto. O comando usado foi:
//
//   npx ffmpeg-static -i bruto.mp4 -an -c:v libx264 -crf 30 -preset slow //       -profile:v high -pix_fmt yuv420p -movflags +faststart //       public/flamingo-video.mp4
//
// 1.2 MB -> 136 KB com PSNR de 39 dB (visualmente sem perda). VP9/WebM foi
// testado e saiu MAIOR (288 KB) neste clipe curto, alem de nao cobrir Safari
// antigo — por isso ficou so o H.264.

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
