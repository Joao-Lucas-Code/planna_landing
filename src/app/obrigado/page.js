import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Acesso liberado | Planna.IA',
  robots: { index: false, follow: false },
};

export default function Obrigado() {
  return (
    <main className="relative min-h-screen bg-canvas text-ink flex flex-col overflow-hidden grain">
      <div className="absolute inset-0 blueprint opacity-60 pointer-events-none" />
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Cabecalho minimo */}
      <header className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10 py-7">
        <Link
          href="/"
          className="font-display font-extrabold text-[0.95rem] tracking-tight text-ink flex items-baseline gap-[3px] w-fit"
        >
          Planna
          <span className="text-accent-soft">.IA</span>
        </Link>
      </header>

      <div className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 py-16">
          <div className="max-w-3xl">
            <div className="reveal flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-positive" />
              <span className="mono-micro text-ink-3">
                Confirmado · Você está na lista
              </span>
            </div>

            <h1 className="reveal d-2 display-xl text-ink mt-8">
              Acesso <span className="text-accent-soft">liberado</span>
            </h1>

            <p className="reveal d-4 mt-8 text-lg text-ink-2 leading-relaxed measure">
              A versão beta do{' '}
              <span className="text-ink">Planna.IA</span> acabou de sair do
              forno. Como você está na lista, seus{' '}
              <span className="text-ink">14 dias grátis</span> já estão
              disponíveis para uso imediato.
            </p>

            <div className="reveal d-5 mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="https://app.novaflow.me/register"
                className="group relative inline-flex items-center gap-3 bg-ink text-ink-inv h-12 px-7 rounded-sm overflow-hidden"
              >
                <span className="relative z-10 text-[0.9rem] font-medium">
                  Criar conta e acessar
                </span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.75}
                  className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
                <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </a>

              <Link
                href="/"
                className="mono-micro text-ink-2 hover:text-ink transition-colors duration-300 link-underline"
              >
                Voltar para o início
              </Link>
            </div>

            {/* Proximos passos — preenche o vazio com utilidade */}
            <ol className="reveal d-6 mt-20 grid grid-cols-1 sm:grid-cols-3 gap-px bg-hairline border-y border-hairline list-none">
              {[
                ['01', 'Crie sua conta', 'Leva menos de dois minutos.'],
                ['02', 'Conecte suas contas', 'Via Open Finance, acesso read-only.'],
                ['03', 'Receba os insights', 'A IA analisa e sugere em tempo real.'],
              ].map(([num, titulo, desc]) => (
                <li key={num} className="bg-canvas py-6 pr-6 sm:pl-6 sm:first:pl-0">
                  <span className="mono-micro text-accent-soft tabular">
                    {num}
                  </span>
                  <h2 className="display-sm text-ink mt-3">{titulo}</h2>
                  <p className="mt-2 text-[13px] text-ink-3 leading-relaxed">
                    {desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <footer className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10 py-7 border-t border-hairline">
        <span className="mono-micro text-ink-4">
          © 2026 NovaFlow · Todos os direitos reservados
        </span>
      </footer>
    </main>
  );
}
