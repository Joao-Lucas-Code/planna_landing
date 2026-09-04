'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const stats = [
  { value: 2000, decimals: 0, prefix: '', suffix: '+', label: 'Usuários na lista de espera', note: 'Beta fechado' },
  { value: 1.2, decimals: 1, prefix: 'R$ ', suffix: 'M', label: 'Economizados pelos beta testers', note: 'Acumulado' },
  { value: 14, decimals: 0, prefix: '', suffix: ' dias', label: 'Para transformar suas finanças', note: 'Teste grátis' },
];

// Contagem animada de 0 ate o valor final quando entra na viewport
function CountUp({ value, decimals = 0, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // Quem pediu menos movimento recebe o valor final direto
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduz) {
      setCurrent(value);
      return;
    }

    const duration = 1600;
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCurrent(value * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  // Rede de seguranca: se o observer nunca disparar, o numero nao pode ficar
  // preso em 0 — seria uma prova social dizendo "0 usuarios".
  useEffect(() => {
    const t = setTimeout(() => setCurrent((c) => (c === 0 ? value : c)), 2500);
    return () => clearTimeout(t);
  }, [value]);

  const formatted = current.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className="tabular">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative border-y border-hairline bg-surface">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Divisorias verticais em hairline substituem os cards soltos */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-hairline">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`py-12 md:py-16 ${index === 0 ? 'md:pr-10' : 'md:px-10'} ${
                index === stats.length - 1 ? 'md:pr-0' : ''
              }`}
            >
              <span className="mono-micro text-ink-4">{stat.note}</span>

              <div className="font-display font-bold text-[2.75rem] md:text-[3.5rem] leading-none tracking-[-0.04em] text-ink mt-4">
                <CountUp
                  value={stat.value}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>

              <p className="mt-4 text-sm text-ink-3 leading-relaxed max-w-[22ch]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
