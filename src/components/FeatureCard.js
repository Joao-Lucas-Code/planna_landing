'use client'; // Necessário para usar o useState no Next.js
import { useState } from 'react';

export default function FeatureCard({ icon: Icon, title, description, backTitle, backContent }) {
  // No mobile (sem hover) o toque alterna o insight; no desktop o hover resolve via CSS
  const [showInsight, setShowInsight] = useState(false);

  return (
    <div
      className="group relative bg-[#131316] border border-white/[0.08] rounded-2xl p-6 flex flex-col min-h-[280px] cursor-pointer hover:border-violet-500/50 transition-colors"
      onClick={() => setShowInsight(!showInsight)}
    >
      {/* Ícone no topo, alinhado à esquerda */}
      <div className="mb-4">
        <Icon className="w-6 h-6 text-[#8B5CF6]" />
      </div>

      {/* Título */}
      <h3 className="font-syne text-lg font-semibold text-[#FAFAFA] mb-2">{title}</h3>

      {/* Descrição — flex-grow ocupa o espaço sem vazar */}
      <p className="text-[#A1A1AA] text-sm leading-relaxed mb-4 flex-grow">{description}</p>

      {/* CTA — sempre no final, dentro do padding */}
      <span className="text-xs uppercase tracking-wider text-[#52525B] group-hover:text-[#8B5CF6] transition-colors mt-auto">
        Toque para ver mais →
      </span>

      {/* Overlay com o insight de IA (fade — sem transform 3D) */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0a0a1a] to-[#0d0820] border border-violet-500/30 p-6 flex flex-col justify-center transition-opacity duration-300 ${
          showInsight ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } group-hover:opacity-100`}
      >
        <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-2">Insight de IA</span>
        <h4 className="font-syne font-bold text-sm text-white mb-2">{backTitle}</h4>
        <p className="text-gray-400 text-xs leading-relaxed">{backContent}</p>
      </div>
    </div>
  );
}
