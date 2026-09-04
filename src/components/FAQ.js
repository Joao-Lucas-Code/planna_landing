'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const faqData = [
  {
    question: 'O Planna.IA é seguro para conectar minha conta bancária?',
    answer:
      'Sim. A segurança é a nossa infraestrutura base. Utilizamos o Open Finance regulamentado pelo Banco Central com criptografia AES-256 de ponta a ponta. A nossa IA possui acesso estritamente de leitura (read-only) para gerar insights — nós nunca movimentamos seu dinheiro.',
  },
  {
    question: 'A inteligência artificial pode fazer pagamentos por mim?',
    answer:
      'Não. O Planna.IA atua como o seu copiloto financeiro analítico. Ele categoriza gastos, identifica padrões e sugere otimizações, mas a movimentação do dinheiro e a palavra final continuam 100% nas suas mãos.',
  },
  {
    question: 'Quais bancos e corretoras são suportados?',
    answer:
      'Nubank, Itaú, Bradesco, Santander, Inter, XP, BTG e mais de 80 outras instituições. A lista cresce mensalmente, garantindo uma sincronização segura e automática via Open Finance.',
  },
  {
    question: 'Como funciona a garantia dos 14 dias grátis?',
    answer:
      'Ao garantir o seu lugar na nossa lista de espera hoje, você recebe automaticamente um passe de 14 dias para testar todos os recursos avançados assim que a plataforma for lançada, sem precisar cadastrar cartão de crédito antecipado.',
  },
];

function FAQItem({ index, question, answer, isOpen, onClick }) {
  const painelId = `faq-painel-${index}`;
  const botaoId = `faq-botao-${index}`;

  return (
    <div className="border-b border-hairline">
      <h3>
        <button
          id={botaoId}
          aria-expanded={isOpen}
          aria-controls={painelId}
          onClick={onClick}
          className="group w-full py-7 flex items-start gap-5 md:gap-8 text-left cursor-pointer"
        >
          <span className="mono-micro text-ink-4 tabular pt-1.5 shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>

          <span
            className={`display-sm flex-1 transition-colors duration-300 ${
              isOpen ? 'text-ink' : 'text-ink-2 group-hover:text-ink'
            }`}
          >
            {question}
          </span>

          {/* Sinal +/− em hairline: gira e vira traço ao abrir */}
          <span className="relative w-4 h-4 shrink-0 mt-1.5" aria-hidden="true">
            <span className="absolute top-1/2 left-0 w-4 h-px bg-ink-2 -translate-y-1/2" />
            <span
              className={`absolute top-1/2 left-0 w-4 h-px bg-ink-2 -translate-y-1/2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? 'rotate-0' : 'rotate-90'
              }`}
            />
          </span>
        </button>
      </h3>

      {/* grid-rows 0fr→1fr: abre com a altura real do conteudo.
          O max-h fixo anterior cortava as respostas mais longas. */}
      <div
        id={painelId}
        role="region"
        aria-labelledby={botaoId}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-8 pl-9 md:pl-12 pr-8 text-[15px] text-ink-2 leading-relaxed measure-wide">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative py-28 md:py-40 scroll-mt-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Coluna fixa: o titulo acompanha a leitura das perguntas */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4"
              >
                <span className="mono-micro text-accent-soft tabular">04</span>
                <span className="mono-label text-ink-3">Dúvidas</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="display-lg text-ink mt-7"
              >
                Perguntas frequentes
              </motion.h2>

              <p className="mt-5 text-ink-3 text-sm leading-relaxed max-w-[32ch]">
                Não achou o que procurava? Escreva para{' '}
                <a
                  href="mailto:contato@novaflow.me"
                  className="text-ink-2 hover:text-ink transition-colors link-underline"
                >
                  contato@novaflow.me
                </a>
                .
              </p>
            </div>
          </div>

          {/* Lista */}
          <div className="lg:col-span-8 border-t border-hairline">
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                index={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
