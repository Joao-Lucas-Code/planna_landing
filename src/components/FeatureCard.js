'use client'; // Necessário para usar o useState no Next.js
import { useState } from 'react';

export default function FeatureCard({ icon, title, description, backTitle, backContent }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group perspective-1000 w-full min-h-[220px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* FRENTE DO CARD */}
        <div className="absolute inset-0 backface-hidden bg-black border border-white/10 rounded-2xl p-8 flex flex-col group-hover:border-purple-500/50 transition-colors">
          <div className="text-3xl mb-4">{icon}</div>
          <h3 className="font-syne font-bold text-lg mb-2">{title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
          <span className="mt-auto text-[10px] text-gray-600 uppercase tracking-widest">Toque para ver mais</span>
        </div>

        {/* VERSO DO CARD */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-[#0a0a1a] to-[#0d0820] border border-purple-500/30 rounded-2xl p-8 flex flex-col justify-center">
          <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest mb-2">Insight de IA</span>
          <h4 className="font-syne font-bold text-sm text-white mb-2">{backTitle}</h4>
          <p className="text-gray-400 text-xs leading-relaxed">{backContent}</p>
        </div>

      </div>
    </div>
  );
}