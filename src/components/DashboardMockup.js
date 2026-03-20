'use client'; // Obrigatório para Client Components
import { motion } from 'framer-motion';

export default function DashboardMockup() {
  // Valores das alturas das barras (em porcentagem para Flexbox)
  const barHeights = [40, 60, 45, 80, 55, 90, 70, 85, 95, 75, 88, 100];

  return (
    <div className="mt-16 w-full max-w-[860px] relative z-10">
      <div className="bg-[#07070f] border border-white/10 rounded-2xl p-6 shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden">
        
        {/* Topbar (Bolinhas) */}
        <div className="flex gap-2 mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Patrimônio total', value: 'R$ 84.320', delta: '↑ +8.4%', pos: true },
            { label: 'Gastos do mês', value: 'R$ 3.210', delta: '↓ −12%', pos: false },
            { label: 'Rentabilidade', value: '+14.7%', delta: '↑ Acima do CDI', pos: true }
          ].map((card, i) => (
            <div key={i} className="bg-[#0a0a14] border border-white/5 rounded-xl p-4 text-left">
              <span className="text-[10px] text-[#6b6b8a] uppercase tracking-wider font-dm">{card.label}</span>
              <div className="font-syne font-bold text-xl text-white mt-1">{card.value}</div>
              <div className={`text-[10px] font-dm mt-1 ${card.pos ? 'text-emerald-400' : 'text-red-400'}`}>{card.delta}</div>
            </div>
          ))}
        </div>

        {/* ÁREA DO GRÁFICO CORRIGIDA (Usando divs, não SVG) */}
        <div className="bg-[#0a0a14] border border-white/5 rounded-xl h-[160px] flex items-end justify-between p-3 gap-1 md:gap-2 overflow-hidden relative">
          
          {/* Linhas de grade sutis ao fundo (Opcional, para dar profundidade) */}
          <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none">
            <div className="border-b border-white/[0.03] w-full h-0"></div>
            <div className="border-b border-white/[0.03] w-full h-0"></div>
            <div className="border-b border-white/[0.03] w-full h-0"></div>
          </div>

          {barHeights.map((height, i) => (
            <motion.div
              key={i}
              className="relative flex-1 rounded-t-sm md:rounded-t"
              style={{
                height: `${height}%`,
                // Define o degradê azul ou roxo baseado no índice (idêntico ao Cauã)
                background: i % 3 === 2 
                  ? 'linear-gradient(to top, #4c1d95, #8b5cf6)' // Roxo
                  : 'linear-gradient(to top, #1e40af, #3b82f6)', // Azul
                // Brilho intenso nas barras roxas (i % 3 === 2)
                boxShadow: i % 3 === 2 ? '0 0 15px rgba(139, 92, 246, 0.3)' : 'none',
                originY: 1 // Animação começa da base
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: i % 3 === 2 ? 1 : 0.7 }}
              transition={{
                duration: 0.6,
                delay: i * 0.04, // Efeito cascata mais rápido
                ease: [0.22, 1, 0.36, 1] // EaseOutExpo para parada suave
              }}
              viewport={{ once: true, amount: 1 }}
            />
          ))}
        </div>

        {/* AI Insight Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-4 flex items-center gap-3 bg-purple-500/10 border border-purple-500/20 rounded-xl p-3"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-xs text-white">✦</div>
          <p className="text-[11px] text-[#6b6b8a] text-left leading-relaxed font-dm">
            <strong className="text-white">IA detectou uma oportunidade:</strong> Seus gastos com alimentação subiram 23%. Reduzindo R$ 300/mês, você pode alcançar sua meta em 4 meses.
          </p>
        </motion.div>
      </div>
    </div>
  );
}