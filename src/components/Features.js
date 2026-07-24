'use client'; // Passa componentes de ícone (Lucide) como props para o FeatureCard (client)

import { BarChart3, Rocket, Target } from 'lucide-react';
import FeatureCard from './FeatureCard';
import ScrollReveal from './ScrollReveal';

const featuresData = [
  {
    icon: BarChart3,
    title: "Análise de Gastos",
    description: "Categorização automática de todas as suas transações com insights personalizados.",
    backTitle: "Economia Inteligente",
    backContent: "A IA identificou que você pode economizar R$ 280 trocando pedidos de delivery por refeições em casa."
  },
  {
    icon: Rocket,
    title: "Otimização",
    description: "Recomendações de portfólio baseadas no seu perfil de risco e metas.",
    backTitle: "Projeção de Patrimônio",
    backContent: "Com os ajustes sugeridos, você pode terminar o ano com R$ 1.500 a mais investidos."
  },
  {
    icon: Target,
    title: "Metas",
    description: "Defina objetivos financeiros e deixe a IA traçar o caminho mais eficiente.",
    backTitle: "Viagem Europa 2025",
    backContent: "Faltam apenas R$ 1.200. Mantendo o ritmo atual, você atinge a meta em 3 meses!"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-[5%]">
      <div className="text-center mb-16">
        <ScrollReveal>
          <span className="text-blue-500 text-xs font-bold uppercase tracking-widest">Recursos</span>
          <h2 className="font-syne font-bold text-3xl md:text-5xl mt-4">Tudo sob controle</h2>
        </ScrollReveal>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
        {featuresData.map((feat, index) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <FeatureCard {...feat} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
