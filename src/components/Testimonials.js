'use client';

import { motion } from 'framer-motion';
import SectionIntro from './SectionIntro';

const testimonials = [
  {
    name: 'Cauã',
    role: 'Beta Tester',
    initial: 'C',
    text: 'A interface é absurdamente intuitiva. Em dois minutos a IA já tinha categorizado todos os meus gastos do mês sem eu precisar criar planilhas complexas.',
  },
  {
    name: 'Mariana',
    role: 'Early Access',
    initial: 'M',
    text: 'Finalmente um app que não só mostra para onde meu dinheiro foi, mas me avisa antes de eu gastar demais. A notificação de meta me salvou esse mês!',
  },
  {
    name: 'Rafaela',
    role: 'Beta Tester',
    initial: 'R',
    text: 'Eu usava três apps diferentes para acompanhar contas e investimentos. O Planna.IA unificou tudo e os insights da inteligência artificial são muito precisos.',
  },
];

/** Assinatura: monograma em quadrado hairline. Sem circulo com gradiente. */
function Assinatura({ initial, name, role }) {
  return (
    <div className="flex items-center gap-3.5">
      <span className="w-9 h-9 rounded-sm border border-hairline bg-raised flex items-center justify-center font-display font-bold text-[13px] text-ink-2 shrink-0">
        {initial}
      </span>
      <div className="min-w-0">
        <div className="text-sm text-ink font-medium leading-tight">{name}</div>
        <div className="mono-micro text-ink-4 mt-1">{role}</div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [destaque, ...resto] = testimonials;

  return (
    <section
      id="testimonials"
      className="relative py-28 md:py-40 border-y border-hairline bg-surface scroll-mt-20"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionIntro
          index="02"
          eyebrow="Prova social"
          title="O que dizem os primeiros usuários"
          description="Quem já teve acesso antecipado ao agente financeiro — sem roteiro, sem filtro."
        />

        {/* Citacao principal em corpo de display: hierarquia real entre os
            tres depoimentos, em vez de tres cards de peso identico. */}
        {/* Citacao revelada por cortina vertical, e nao por deslocamento:
            o texto e descoberto de cima para baixo, como quem le. */}
        <figure className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <span
            aria-hidden="true"
            className="hidden lg:block lg:col-span-1 font-display font-extrabold text-[5rem] leading-[0.6] text-ink-4/50 select-none"
          >
            &ldquo;
          </span>

          <motion.blockquote
            className="lg:col-span-8"
            // A opacidade acompanha o recorte de proposito. Sob
            // prefers-reduced-motion o framer descarta o clipPath e anima
            // so a opacidade — sem esse par, ele aplicaria o recorte inicial
            // e nunca o animaria, deixando a citacao invisivel para sempre.
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-display font-semibold text-[1.5rem] md:text-[2rem] leading-[1.25] tracking-[-0.025em] text-ink">
              {destaque.text}
            </p>
          </motion.blockquote>

          <motion.figcaption
            className="lg:col-span-3 lg:pt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.75 }}
          >
            <Assinatura {...destaque} />
          </motion.figcaption>
        </figure>

        {/* Depoimentos de apoio, separados por hairline */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border-t border-hairline">
          {resto.map((item, index) => (
            <motion.figure
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-surface pt-9 pb-2 md:px-8 md:first:pl-0"
            >
              <blockquote>
                <p className="text-[15px] text-ink-2 leading-relaxed max-w-[46ch]">
                  {item.text}
                </p>
              </blockquote>
              <figcaption className="mt-8">
                <Assinatura {...item} />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
