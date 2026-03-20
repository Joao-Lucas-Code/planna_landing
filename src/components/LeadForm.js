'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LeadForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('cadastros_lp') // nome da tabela que o Cauã criou
      .insert([{ email }]);

    if (error) {
      setMessage('Ops! Algo deu errado ou e-mail já cadastrado.');
    } else {
      setMessage('Sucesso! Você está na lista de espera. 🎉');
      setEmail('');
    }
    setLoading(false);
  };

  return (
    <section className="py-20 px-[5%] flex justify-center">
      <div className="w-full max-w-xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 p-8 md:p-12 rounded-3xl text-center">
        <h2 className="font-syne font-bold text-2xl md:text-4xl mb-4 text-white">Garanta seu lugar</h2>
        <p className="text-gray-400 mb-8 text-sm md:text-base">Seja o primeiro a saber quando a Planna.AI for lançada.</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          <input 
            type="email" 
            placeholder="Seu melhor e-mail" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition-all"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Entrar na lista'}
          </button>
        </form>
        {message && <p className="mt-4 text-xs font-medium text-purple-400">{message}</p>}
      </div>
    </section>
  );
}