// Gera public/og-image.png (1200x630) para Open Graph. Uso unico: node scripts/generate-og-image.js
const sharp = require('sharp');
const path = require('path');

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#050508"/>
      <stop offset="1" stop-color="#120a24"/>
    </linearGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#3b82f6"/>
      <stop offset="0.5" stop-color="#a855f7"/>
      <stop offset="1" stop-color="#ec4899"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#a855f7" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#a855f7" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1000" cy="120" r="320" fill="url(#glow)"/>
  <circle cx="150" cy="540" r="280" fill="url(#glow)"/>
  <text x="600" y="290" font-family="Arial, Helvetica, sans-serif" font-size="120" font-weight="bold" fill="url(#brand)" text-anchor="middle">PlannaIA</text>
  <text x="600" y="380" font-family="Arial, Helvetica, sans-serif" font-size="42" fill="#d1d5db" text-anchor="middle">Gestão financeira inteligente</text>
  <text x="600" y="450" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#6b7280" text-anchor="middle">Um produto NovaFlow</text>
</svg>`;

sharp(Buffer.from(svg))
  .png()
  .toFile(path.join(__dirname, '..', 'public', 'og-image.png'))
  .then((info) => console.log('og-image.png gerado:', info.width + 'x' + info.height, Math.round(info.size / 1024) + ' KB'))
  .catch((err) => { console.error(err); process.exit(1); });
