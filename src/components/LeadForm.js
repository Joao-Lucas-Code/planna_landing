'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LeadForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // Instanciando o roteador do Next.js
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
      // Em vez de mostrar a mensagem, redireciona o usuário na hora!
      router.push('/obrigado');
    }
  };

  return (
    <section id="waitlist" className="py-32 px-[5%] flex justify-center scroll-mt-20">
      <div className="reveal w-full max-w-xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-8 md:p-12 rounded-3xl text-center relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
        <h2 className="font-syne font-bold text-2xl md:text-4xl mb-4 text-white">Garanta seu lugar</h2>
        <p className="text-gray-400 mb-8 text-sm md:text-base font-dm">
          Seja o primeiro a saber quando a Planna.IA for lançada e garanta seus <span className="text-white font-bold">14 dias grátis</span>.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 relative z-10">
          <input 
            type="email" 
            placeholder="Seu melhor e-mail" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition-all font-dm"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform disabled:opacity-50 text-white shadow-lg shadow-purple-500/20"
          >
            {loading ? 'Enviando...' : 'Entrar na lista'}
          </button>
        </form>
        {message && <p className="mt-4 text-xs font-medium text-purple-400 animate-fade-in font-dm">{message}</p>}
      </div>
    </section>
  );
}