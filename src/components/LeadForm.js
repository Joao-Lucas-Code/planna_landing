'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LeadForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Normaliza e valida antes de falar com o Supabase
    const cleanEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setMessage('Digite um e-mail válido.');
      return;
    }

    setLoading(true);
    setMessage('');

    const { error } = await supabase.from('cadastros_lp').insert([{ email: cleanEmail }]);

    if (error) {
      // 23505 = unique violation (e-mail ja cadastrado); 409 = conflito do PostgREST
      if (error.code === '23505' || error.status === 409) {
        setMessage('Você já está na lista!');
      } else {
        setMessage('Ops! Algo deu errado. Tente novamente.');
      }
      setLoading(false);
    } else {
      // Email de boas-vindas em fire-and-forget: nao bloqueia o redirect.
      // Se o backend falhar, o lead ja esta salvo no Supabase e a experiencia nao muda.
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://novaflow-backend.onrender.com'}/api/leads/welcome/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      }).catch(() => {});

      // Em vez de mostrar a mensagem, redireciona o usuário na hora!
      router.push('/obrigado');
    }
  };

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden border-t border-hairline grain scroll-mt-20"
    >
      <div className="absolute inset-0 blueprint opacity-60 pointer-events-none" />
      <div className="absolute inset-0 vignette pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10 py-32 md:py-48">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-soft" />
            <span className="mono-micro text-ink-3">
              Vagas limitadas para o beta
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="display-xl text-ink mt-8"
          >
            Garanta seu lugar
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-lg text-ink-2 leading-relaxed measure"
          >
            Seja o primeiro a saber quando o Planna.IA for lançado e garanta seus{' '}
            <span className="text-ink">14 dias grátis</span> — sem cartão de
            crédito.
          </motion.p>

          {/* Campo sublinhado, sem caixa arredondada. */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            className="mt-14 max-w-xl"
          >
            <label htmlFor="email-waitlist" className="mono-micro text-ink-3">
              Endereço de e-mail
            </label>

            <div className="group mt-4 flex items-center gap-4 border-b border-hairline focus-within:border-accent-soft transition-colors duration-500 pb-3">
              <input
                id="email-waitlist"
                type="email"
                placeholder="voce@empresa.com"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 bg-transparent text-ink text-base md:text-lg placeholder:text-ink-4 outline-none focus-visible:outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="shrink-0 inline-flex items-center gap-2.5 text-ink disabled:opacity-40 disabled:cursor-wait cursor-pointer group/btn"
              >
                <span className="mono-micro">
                  {loading ? 'Enviando' : 'Entrar'}
                </span>
                <span className="w-9 h-9 rounded-full border border-hairline group-hover/btn:border-accent-soft group-hover/btn:bg-accent/10 flex items-center justify-center transition-all duration-400">
                  <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-x-0.5">
                    →
                  </span>
                </span>
              </button>
            </div>

            {/* Mensagem de erro/estado — anunciada por leitores de tela */}
            <p
              aria-live="polite"
              className={`mt-4 text-[13px] transition-opacity duration-300 ${
                message ? 'opacity-100 text-accent-soft' : 'opacity-0'
              }`}
            >
              {message || ' '}
            </p>

            <p className="mt-6 mono-micro text-ink-3 leading-relaxed">
              Sem spam · Cancele quando quiser · Acesso read-only
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
