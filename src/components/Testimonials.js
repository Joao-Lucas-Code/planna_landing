'use client';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Cauã",
      role: "Beta Tester",
      text: "A interface é absurdamente intuitiva. Em dois minutos a IA já tinha categorizado todos os meus gastos do mês sem eu precisar criar planilhas complexas.",
      initial: "C"
    },
    {
      name: "Mariana",
      role: "Early Access",
      text: "Finalmente um app que não só mostra para onde meu dinheiro foi, mas me avisa antes de eu gastar demais. A notificação de meta me salvou esse mês!",
      initial: "M"
    },
    {
      name: "Rafaela",
      role: "Beta Tester",
      text: "Eu usava três apps diferentes para acompanhar contas e investimentos. O Planna unificou tudo e os insights da inteligência artificial são muito precisos.",
      initial: "R"
    }
  ];

  return (
    <section id="testimonials" className="py-24 px-[5%] bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16 reveal">
          <span className="text-blue-500 text-xs font-bold uppercase tracking-widest">Prova Social</span>
          <h2 className="font-syne font-bold text-3xl md:text-5xl mt-4 mb-4">O que dizem os primeiros usuários</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-dm">
            Veja o que as pessoas que já tiveram acesso antecipado estão achando do nosso agente financeiro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div 
              key={index} 
              className="reveal p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex gap-1 mb-6 text-pink-500 text-sm">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed font-dm mb-8 italic">
                "{item.text}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold font-syne shrink-0">
                  {item.initial}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{item.name}</h4>
                  <p className="text-gray-500 text-xs">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}