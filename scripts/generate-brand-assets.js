// Gera os assets de marca (favicons, ícones PWA, OG image) a partir da marca
// flamingo-P. Uso: node scripts/generate-brand-assets.js
//
// A fonte de verdade dos caminhos vetoriais é este arquivo + o componente
// src/components/FlamingoMark.js. Se a marca mudar, atualize os dois.

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'favicon');
const PUBLIC = path.join(__dirname, '..', 'public');

const ROSA = '#FF5C8A';
const BICO = '#8E1E43';
const BASE = '#0B0709';

/** Variante compacta: traços grossos, sem olho. Para <= 64px. */
const marcaCompacta = (fill = ROSA, bico = BICO) => `
  <path d="M15 76 L15 30 C15 14 25 3 38 3 C48 3 55 9 55 16 L44 17
           C44 13 42 11 38 11 C31 11 26 19 26 31
           C35 27 47 30 52 37 C58 45 55 56 45 60
           C36 63 24 62 15 58 Z" fill="${fill}"/>
  <path d="M55 16 C60 19 62 25 60 31 C56 26 51 21 47 18 Z" fill="${bico}"/>
  <path d="M15 76 L26 76 L26 60 L15 60 Z" fill="${fill}"/>
  <path d="M12 78 L30 78" stroke="${fill}" stroke-width="6" stroke-linecap="round"/>
`;

/** Variante completa: com olho e bico em gancho. Para >= 96px. */
const marcaCompleta = (fill = ROSA) => `
  <path d="M17 74 L17 30 C17 16 25 6 37 5 C46 4 52 9 52 15 L44 16
           C44 12 41 10 37 11 C30 12 26 20 26 31
           C34 28 45 30 50 36 C56 43 54 54 45 58
           C38 61 31 60 26 58 L26 74 Z" fill="${fill}"/>
  <path d="M52 15 C56 17 58 22 57 26 C54 23 50 19 47 17 Z" fill="${BICO}"/>
  <path d="M57 26 L55.6 22.5 L58 25.5 Z" fill="#240811"/>
  <circle cx="46.5" cy="12.5" r="1.7" fill="#240811"/>
  <path d="M14 76 L29 76" stroke="${fill}" stroke-width="5" stroke-linecap="round"/>
`;

/** Envolve a marca num quadrado, com fundo opcional. */
function quadrado(size, { fundo = null, raio = 0, compacta = false } = {}) {
  const corpo = compacta ? marcaCompacta() : marcaCompleta();
  const bg = fundo
    ? `<rect width="96" height="96" rx="${raio}" fill="${fundo}"/>`
    : '';
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="${size}" height="${size}">
      ${bg}
      <g transform="${compacta ? 'translate(6.3 0.6) scale(1.128)' : 'translate(17.5 7) scale(0.93)'}">${corpo}</g>
    </svg>`
  );
}

/** Empacota PNGs num container .ico (o formato aceita PNG desde o Vista). */
function montarIco(pngs) {
  const n = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reservado
  header.writeUInt16LE(1, 2); // tipo: icone
  header.writeUInt16LE(n, 4); // quantidade

  const entradas = [];
  let offset = 6 + n * 16;

  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // largura
    e.writeUInt8(size >= 256 ? 0 : size, 1); // altura
    e.writeUInt8(0, 2); // paleta
    e.writeUInt8(0, 3); // reservado
    e.writeUInt16LE(1, 4); // planos
    e.writeUInt16LE(32, 6); // bits por pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    entradas.push(e);
    offset += data.length;
  }

  return Buffer.concat([header, ...entradas, ...pngs.map((p) => p.data)]);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  // --- Favicons PNG (fundo transparente: o rosa funciona em aba clara e escura)
  const alvos = [
    { arquivo: 'favicon-96x96.png', size: 96, compacta: true },
    { arquivo: 'web-app-manifest-192x192.png', size: 192, compacta: false, fundo: BASE, raio: 20 },
    { arquivo: 'web-app-manifest-512x512.png', size: 512, compacta: false, fundo: BASE, raio: 20 },
    // iOS compõe sobre preto ou branco, então o ícone precisa de fundo próprio
    { arquivo: 'apple-touch-icon.png', size: 180, compacta: false, fundo: BASE, raio: 0 },
  ];

  for (const { arquivo, size, compacta, fundo, raio } of alvos) {
    await sharp(quadrado(size, { compacta, fundo, raio }))
      .png()
      .toFile(path.join(OUT, arquivo));
    console.log('✓', arquivo, `${size}x${size}`);
  }

  // --- favicon.ico com 16, 32 e 48
  const pngsIco = [];
  for (const size of [16, 32, 48]) {
    const data = await sharp(quadrado(size, { compacta: true })).png().toBuffer();
    pngsIco.push({ size, data });
  }
  fs.writeFileSync(path.join(OUT, 'favicon.ico'), montarIco(pngsIco));
  console.log('✓ favicon.ico (16/32/48)');

  // --- Open Graph 1200x630
  const og = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <defs>
        <radialGradient id="halo" cx="50%" cy="42%" r="46%">
          <stop offset="0%" stop-color="#FF5C8A" stop-opacity="0.20"/>
          <stop offset="100%" stop-color="#FF5C8A" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="chao" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FF5C8A" stop-opacity="0.14"/>
          <stop offset="100%" stop-color="#FF5C8A" stop-opacity="0"/>
        </linearGradient>
      </defs>

      <rect width="1200" height="630" fill="${BASE}"/>
      <rect width="1200" height="630" fill="url(#halo)"/>
      <rect y="470" width="1200" height="160" fill="url(#chao)"/>

      <g transform="translate(118 150) scale(3.4)">${marcaCompleta()}</g>

      <text x="380" y="272" font-family="Syne, Verdana, sans-serif" font-size="86"
            font-weight="800" fill="#FAF7F8" letter-spacing="-3.6">Planna<tspan fill="${ROSA}">.IA</tspan></text>
      <text x="382" y="336" font-family="Verdana, sans-serif" font-size="30" fill="#A79AA0">
        Suas finanças em equilíbrio.</text>
      <text x="382" y="384" font-family="Verdana, sans-serif" font-size="30" fill="#A79AA0">
        O agente financeiro com IA da NovaFlow.</text>

      <rect x="382" y="436" width="86" height="2" fill="${ROSA}"/>
      <text x="382" y="486" font-family="Consolas, monospace" font-size="21"
            fill="#6E626A" letter-spacing="3.4">OPEN FINANCE · IA · READ-ONLY</text>
    </svg>`;

  await sharp(Buffer.from(og)).png().toFile(path.join(PUBLIC, 'og-image.png'));
  console.log('✓ og-image.png 1200x630');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
