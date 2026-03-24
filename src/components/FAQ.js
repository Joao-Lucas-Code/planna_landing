'use client';
import { useState } from 'react';

const faqData = [
  {
    question: "O Planna.AI é seguro para conectar minha conta bancária?",
    answer: "Sim. A segurança é a nossa infraestrutura base. Utilizamos o Open Finance regulamentado pelo Banco Central com criptografia AES-256 de ponta a ponta. A nossa IA possui acesso estritamente de leitura (read-only) para gerar insights — nós nunca movimentamos seu dinheiro."
  },
  {
    question: "A inteligência artificial pode fazer pagamentos por mim?",
    answer: "Não. O Planna.AI atua como o seu copiloto financeiro analítico. Ele categoriza gastos, identifica padrões e sugere otimizações, mas a movimentação do dinheiro e a palavra final continuam 100% nas suas mãos."
  },
  {
    question: "Quais bancos e corretoras são suportados?",
    answer: "Nubank, Itaú, Bradesco, Santander, Inter, XP, BTG e mais de 80 outras instituições. A lista cresce mensalmente, garantindo uma sincronização segura e automática via Open Finance."
  },
  {
    question: "Como funciona a garantia dos 14 dias grátis?",
    answer: "Ao garantir o seu lugar na nossa lista de espera hoje, você recebe automaticamente um passe de 14 dias para testar todos os recursos avançados assim que a plataforma for lançada, sem precisar cadastrar cartão de crédito antecipado."
  }
];

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-white/5 reveal">
      <button 
        className="w-full py-6 flex justify-between items-center text-left hover:text-blue-400 transition-colors cursor-pointer"
        onClick={onClick}
      >
        <span className="font-syne font-bold text-sm md:text-base pr-4">{question}</span>
        <span className={`text-xl text-blue-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ⌄
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-400 text-sm leading-relaxed font-dm">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-24 px-[5%] max-w-3xl mx-auto scroll-mt-20">
      <div className="text-center mb-12 reveal">
        <span className="text-purple-500 text-xs font-bold uppercase tracking-widest">Dúvidas</span>
        <h2 className="font-syne font-bold text-3xl md:text-5xl mt-4">Perguntas Frequentes</h2>
      </div>

      <div className="flex flex-col">
        {faqData.map((item, index) => (
          <FAQItem 
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
}