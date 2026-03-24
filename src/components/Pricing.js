'use client';

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
      <h2 className="reveal font-syne font-bold text-3xl md:text-5xl mb-16">Simples e transparente</h2>
      
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {plans.map((plan, i) => (
          <div 
            key={i} 
            className={`reveal p-8 rounded-2xl border w-full max-w-xs text-left transition-transform hover:scale-105 ${
              plan.featured 
                ? 'border-purple-500 bg-purple-500/5 shadow-[0_0_40px_rgba(139,92,246,0.1)]' 
                : 'border-white/10 bg-white/5'
            }`}
            style={{ transitionDelay: `${i * 200}ms` }}
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
                  <span className="text-blue-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <button 
              onClick={scrollToWaitlist}
              className={`w-full py-3 rounded-xl font-bold transition-all ${
                plan.featured 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-500/20' 
                  : 'border border-white/10 text-white hover:bg-white/10'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}