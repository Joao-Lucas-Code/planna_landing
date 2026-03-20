import FeatureCard from './FeatureCard';

const featuresData = [
  {
    icon: "📊",
    title: "Análise de Gastos",
    description: "Categorização automática de todas as suas transações com insights personalizados.",
    backTitle: "Economia Inteligente",
    backContent: "A IA identificou que você pode economizar R$ 280 trocando pedidos de delivery por refeições em casa."
  },
  {
    icon: "🚀",
    title: "Otimização",
    description: "Recomendações de portfólio baseadas no seu perfil de risco e metas.",
    backTitle: "Projeção de Patrimônio",
    backContent: "Com os ajustes sugeridos, você pode terminar o ano com R$ 1.500 a mais investidos."
  },
  {
    icon: "🎯",
    title: "Metas",
    description: "Defina objetivos financeiros e deixe a IA traçar o caminho mais eficiente.",
    backTitle: "Viagem Europa 2025",
    backContent: "Faltam apenas R$ 1.200. Mantendo o ritmo atual, você atinge a meta em 3 meses!"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-[5%] bg-[#07070f] border-y border-white/5">
      <div className="text-center mb-16">
        <span className="text-blue-500 text-xs font-bold uppercase tracking-widest">Recursos</span>
        <h2 className="font-syne font-bold text-3xl md:text-5xl mt-4">Tudo sob controle</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {featuresData.map((feat, index) => (
          <FeatureCard key={index} {...feat} />
        ))}
      </div>
    </section>
  );
}