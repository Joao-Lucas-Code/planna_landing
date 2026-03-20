export default function DashboardMockup() {
  return (
    <div className="mt-16 w-full max-w-[860px] animate-fade-up animation-delay-1000">
      <div className="bg-[#07070f] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
        {/* Topbar (Bolinhas tipo Mac) */}
        <div className="flex gap-2 mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Patrimônio total', value: 'R$ 84.320', delta: '↑ +8.4%', color: 'text-emerald-400' },
            { label: 'Gastos do mês', value: 'R$ 3.210', delta: '↓ −12%', color: 'text-red-400' },
            { label: 'Rentabilidade', value: '+14.7%', delta: 'Acima do CDI', color: 'text-emerald-400' }
          ].map((item, i) => (
            <div key={i} className="bg-[#0a0a14] border border-white/5 rounded-xl p-4 text-left">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">{item.label}</span>
              <div className="font-syne font-bold text-xl mt-1">{item.value}</div>
              <div className={`text-[10px] mt-1 ${item.color}`}>{item.delta}</div>
            </div>
          ))}
        </div>

        {/* Área do Gráfico (Simulada) */}
        <div className="bg-[#0a0a14] border border-white/5 rounded-xl h-[140px] flex items-end justify-between p-4 gap-2">
           {[40, 60, 45, 90, 55, 100, 70, 85, 110, 75].map((h, i) => (
             <div 
               key={i} 
               style={{ height: `${h}%` }} 
               className={`flex-1 rounded-t-sm transition-all duration-1000 ${i % 3 === 0 ? 'bg-purple-500' : 'bg-blue-600/70'}`}
             />
           ))}
        </div>

        {/* AI Insight Pill */}
        <div className="mt-4 flex items-center gap-3 bg-purple-500/5 border border-purple-500/20 rounded-lg p-3 text-left">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded flex items-center justify-center text-xs">✦</div>
          <p className="text-[11px] text-gray-400 leading-tight">
            <strong className="text-white font-medium">IA detectou:</strong> Seus gastos com alimentação subiram 23%. Reduzindo R$ 300, você atinge sua meta em 4 meses.
          </p>
        </div>
      </div>
    </div>
  );
}