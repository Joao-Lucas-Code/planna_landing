'use client';

import { Check } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Pricing() {
  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const plans = [
    {
      name: "Starter",
      price: "Grátis",
      desc: "Ideal para quem está começando.",
      features: ["1 conta conectada", "Categorização básica", "Relatórios mensais"],
      cta: "Começar agora",
      featured: false
    },
    {
      name: "Pro",
      price: "R$ 9,90",
      period: "/mês",
      desc: "Para quem quer controle total.",
      features: ["Contas ilimitadas", "IA Avançada", "Alertas preditivos", "Análise de investimentos"],
      cta: "Teste 14 dias grátis",
      featured: true
    }
  ];

  return (
    <section id="pricing" className="py-24 px-[5%] text-center">
      <ScrollReveal>
        <h2 className="font-syne font-bold text-3xl md:text-5xl mb-16">Simples e transparente</h2>
      </ScrollReveal>
      
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {plans.map((plan, i) => (
          <ScrollReveal key={i} delay={i * 0.15} className="w-full max-w-xs">
            <div 
              className={`p-8 rounded-2xl border w-full text-left transition-transform hover:scale-105 ${
                plan.featured 
                  ? 'border-violet-500 bg-violet-500/5 scale-[1.02] shadow-[0_0_60px_rgba(139,92,246,0.15)]' 
                  : 'border-white/[0.08] bg-white/[0.03]'
              }`}
            >
            <span className="text-xs uppercase tracking-widest text-gray-500">{plan.name}</span>
            <div className="font-syne font-bold text-4xl mt-4 mb-2">
              {plan.price}
              <span className="text-sm font-normal text-gray-500">{plan.period}</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f, j) => (
                <li key={j} className="text-sm text-gray-300 flex items-center gap-2">
                  <Check size={14} className="text-blue-500 shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <button 
              onClick={scrollToWaitlist}
              className={`w-full py-3 rounded-xl font-bold transition-all ${
                plan.featured 
                  ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-violet-500/10' 
                  : 'border border-white/[0.08] text-white hover:bg-white/10'
              }`}
            >
              {plan.cta}
            </button>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}