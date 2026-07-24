'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const stats = [
  { value: 2000, decimals: 0, prefix: '', suffix: '+', label: 'Usuários na lista de espera' },
  { value: 1.2, decimals: 1, prefix: 'R$ ', suffix: 'M', label: 'Economizados pelos beta testers' },
  { value: 14, decimals: 0, prefix: '', suffix: ' dias', label: 'Para transformar suas finanças' }
];

// Contagem animada de 0 ate o valor final quando entra na viewport
function CountUp({ value, decimals = 0, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;

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

  const formatted = current.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });

  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-20 px-[5%] bg-[#131316] border-y border-white/[0.08]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {stats.map((stat, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <div className="font-syne font-bold text-4xl md:text-5xl text-violet-400">
              <CountUp
                value={stat.value}
                decimals={stat.decimals}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </div>
            <p className="mt-3 font-dm text-sm uppercase tracking-widest text-zinc-500">
              {stat.label}
            </p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
