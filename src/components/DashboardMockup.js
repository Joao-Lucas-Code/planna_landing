'use client';

import { motion } from 'framer-motion';
import { Sparkles, LayoutGrid, PieChart, Target, Wallet } from 'lucide-react';

// Serie de patrimonio (R$ mil) — 12 meses
const SERIE = [52, 55, 54, 59, 63, 61, 68, 72, 70, 76, 80, 84.3];
const MESES = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

const W = 600;
const H = 170;
const MIN = 48;
const MAX = 88;

const pontos = SERIE.map((v, i) => [
  (i * W) / (SERIE.length - 1),
  H - 12 - ((v - MIN) / (MAX - MIN)) * (H - 34),
]);

/** Suaviza a polilinha com curvas cubicas ancoradas nos pontos medios. */
function suavizar(pts) {
  if (pts.length < 2) return '';
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C ${cx.toFixed(1)} ${y0.toFixed(1)}, ${cx.toFixed(1)} ${y1.toFixed(1)}, ${x1.toFixed(1)} ${y1.toFixed(1)}`;
  }
  return d;
}

const linha = suavizar(pontos);
const area = `${linha} L ${W} ${H} L 0 ${H} Z`;

const CARDS = [
  { label: 'Patrimônio total', value: 'R$ 84.320', delta: '+8,4%', pos: true },
  { label: 'Gastos do mês', value: 'R$ 3.210', delta: '−12,0%', pos: true },
  { label: 'Rentabilidade', value: '+14,7%', delta: 'acima do CDI', pos: true },
];

const RAIL = [LayoutGrid, PieChart, Wallet, Target];

export default function DashboardMockup() {
  return (
    <div className="relative w-full">
      {/* Halo bem contido atras da janela — profundidade, nao "glow" */}
      <div className="absolute -inset-x-6 top-10 -bottom-6 bg-accent/[0.07] blur-[80px] rounded-full pointer-events-none" />

      <div className="relative rounded-lg border border-hairline bg-surface shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Barra de titulo */}
        <div className="flex items-center gap-3 h-10 px-4 border-b border-hairline bg-canvas/60">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-ink-4" />
            <span className="w-2 h-2 rounded-full bg-ink-4" />
            <span className="w-2 h-2 rounded-full bg-ink-4" />
          </div>
          <span className="mono-micro text-ink-4 ml-2">planna.ia / visão geral</span>
          <span className="ml-auto mono-micro text-ink-4 hidden sm:block">
            Dez 2025
          </span>
        </div>

        <div className="flex">
          {/* Rail lateral */}
          <div className="hidden sm:flex flex-col items-center gap-1 w-12 py-4 border-r border-hairline shrink-0">
            {RAIL.map((Icon, i) => (
              <span
                key={i}
                className={`w-8 h-8 rounded-sm flex items-center justify-center ${
                  i === 0 ? 'bg-ink/[0.07] text-ink' : 'text-ink-4'
                }`}
              >
                <Icon size={14} strokeWidth={1.5} />
              </span>
            ))}
          </div>

          <div className="flex-1 min-w-0">
            {/* Cards de metrica separados por hairline, sem caixas soltas */}
            <div className="grid grid-cols-3 divide-x divide-hairline border-b border-hairline">
              {CARDS.map((c) => (
                <div key={c.label} className="p-3 md:p-4">
                  <span className="mono-micro text-ink-4 block truncate">
                    {c.label}
                  </span>
                  <div className="font-display font-bold text-base md:text-xl text-ink mt-1.5 tabular tracking-tight">
                    {c.value}
                  </div>
                  <div
                    className={`mono-micro mt-1.5 tabular ${
                      c.pos ? 'text-positive' : 'text-negative'
                    }`}
                  >
                    {c.delta}
                  </div>
                </div>
              ))}
            </div>

            {/* Grafico de area */}
            <div className="p-3 md:p-4">
              <div className="flex items-baseline justify-between mb-3">
                <span className="mono-micro text-ink-4">Evolução patrimonial</span>
                <span className="mono-micro text-ink-4 tabular">12M</span>
              </div>

              <div className="relative">
                {/* Revelacao em CSS puro (ver .chart-draw em globals.css).
                    Nao usa hook: ramificar o markup em useReducedMotion()
                    quebra a hidratacao, porque servidor e cliente devolvem
                    valores diferentes. O estado final e o padrao, entao com
                    "reduzir movimento" o grafico nasce inteiro. */}
                <div className="chart-draw">
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="w-full h-[120px] md:h-[170px] block"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="fillArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF5C8A" stopOpacity="0.26" />
                      <stop offset="100%" stopColor="#FF5C8A" stopOpacity="0" />
                    </linearGradient>

                  </defs>

                  {/* Grade horizontal */}
                  {[0.25, 0.5, 0.75].map((t) => (
                    <line
                      key={t}
                      x1="0"
                      x2={W}
                      y1={H * t}
                      y2={H * t}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                  ))}

                  <path d={area} fill="url(#fillArea)" />
                  <path
                    d={linha}
                    fill="none"
                    stroke="#FF8FB0"
                    strokeWidth="1.75"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                </div>

                {/* Marcador do ultimo ponto */}
                <motion.span
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                  className="absolute right-0 w-1.5 h-1.5 rounded-full bg-accent-soft ring-4 ring-accent/20"
                  style={{ top: `${(pontos[pontos.length - 1][1] / H) * 100}%` }}
                />
              </div>

              {/* Eixo X em mono */}
              <div className="flex justify-between mt-2 px-px">
                {MESES.map((m, i) => (
                  <span key={i} className="mono-micro text-ink-4 text-[9px]">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Insight da IA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="flex items-start gap-3 p-3 md:p-4 border-t border-hairline bg-accent/[0.04]"
            >
              <span className="w-6 h-6 rounded-sm bg-accent/15 border border-accent/25 flex items-center justify-center shrink-0 mt-px">
                <Sparkles size={12} className="text-accent-soft" strokeWidth={1.75} />
              </span>
              <p className="text-[11px] md:text-xs text-ink-2 leading-relaxed text-left">
                <span className="mono-micro text-accent-soft mr-1.5">
                  Insight
                </span>
                Gastos com alimentação subiram 23%. Reduzindo R$ 300/mês, você
                alcança sua meta 4 meses antes.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
