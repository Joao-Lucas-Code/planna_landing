const COLUNAS = [
  {
    titulo: 'Produto',
    links: [
      { label: 'Recursos', href: '#features' },
      { label: 'Preços', href: '#pricing' },
      { label: 'Lista de espera', href: '#waitlist' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    titulo: 'Empresa',
    links: [
      { label: 'NovaFlow', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contato', href: 'mailto:contato@novaflow.me' },
    ],
  },
  {
    titulo: 'Legal',
    links: [
      { label: 'Privacidade', href: '#' },
      { label: 'Termos de uso', href: '#' },
      { label: 'Segurança', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-hairline bg-surface">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        {/* ---------- Bloco principal ---------- */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 py-16 md:py-20">
          <div className="col-span-2 lg:col-span-5">
            <div className="font-display font-extrabold text-2xl tracking-tight text-ink flex items-baseline gap-[3px]">
              Planna
              <span className="text-accent-soft">.IA</span>
            </div>

            <p className="mt-5 text-sm text-ink-3 leading-relaxed max-w-[34ch]">
              O agente financeiro com inteligência artificial da NovaFlow.
              Conectado via Open Finance, com acesso estritamente de leitura.
            </p>

            {/* Indicador de status — detalhe de produto real */}
            <div className="mt-8 inline-flex items-center gap-2.5 border border-hairline rounded-full pl-2.5 pr-3.5 py-1.5">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-positive opacity-60 animate-ping" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-positive" />
              </span>
              <span className="mono-micro text-ink-3">Beta em andamento</span>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1" />

          {COLUNAS.map((coluna) => (
            <nav key={coluna.titulo} className="lg:col-span-2">
              <h2 className="mono-micro text-ink-4">{coluna.titulo}</h2>
              <ul className="mt-5 flex flex-col gap-3.5 list-none">
                {coluna.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-ink-2 hover:text-ink transition-colors duration-300 link-underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ---------- Barra inferior ---------- */}
        <div className="border-t border-hairline py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="mono-micro text-ink-4">
            © 2026 NovaFlow · Todos os direitos reservados
          </span>
          <span className="mono-micro text-ink-4">
            Feito no Brasil · Open Finance / Bacen
          </span>
        </div>
      </div>
    </footer>
  );
}
