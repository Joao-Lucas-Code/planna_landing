'use client';
import { useState } from 'react';

const faqData = [
  {
    question: "O Planna.AI é seguro para conectar minha conta bancária?",
    answer: "Sim. Utilizamos Open Finance regulamentado pelo Banco Central com criptografia AES-256 ponta a ponta. Temos acesso apenas de leitura — nunca movimentamos seu dinheiro."
  },
  {
    question: "Quais bancos e corretoras são suportados?",
    answer: "Nubank, Itaú, Bradesco, Santander, Inter, XP, BTG e mais de 80 outras instituições. A lista cresce mensalmente via Open Finance."
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer: "Sim, sem burocracia. O plano Pro pode ser cancelado direto pelo painel em menos de 1 minuto sem multas ou taxas escondidas."
  },
  {
    question: "A IA realmente aprende com meus hábitos?",
    answer: "Com certeza. Nosso modelo refina as categorias e alertas especificamente para o seu perfil. Quanto mais você usa, mais precisos ficam os insights."
  }
];

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-white/5">
      <button 
        className="w-full py-6 flex justify-between items-center text-left hover:text-blue-400 transition-colors"
        onClick={onClick}
      >
        <span className="font-syne font-bold text-sm md:text-base">{question}</span>
        <span className={`text-xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ⌄
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-6' : 'max-h-0'}`}>
        <p className="text-gray-400 text-sm leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-24 px-[5%] max-w-3xl mx-auto">
      <div className="text-center mb-12">
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