'use client';

/**
 * Card de recurso. O insight da IA nao fica mais escondido atras de um
 * flip/hover — ele e conteudo permanente, ancorado no rodape por uma
 * hairline. Informacao escondida atras de interacao nao vende.
 */
export default function FeatureCard({
  icon: Icon,
  index,
  title,
  description,
  backTitle,
  backContent,
  children,
  className = '',
}) {
  return (
    <article
      className={`group relative flex flex-col border border-hairline bg-surface rounded-md overflow-hidden transition-colors duration-500 hover:border-ink/20 ${className}`}
    >
      {/* Linha de acento que percorre o topo no hover */}
      <span className="absolute top-0 left-0 h-px w-full bg-accent-soft/60 scale-x-0 origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

      <div className="p-6 md:p-7 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-4">
          <span className="w-9 h-9 rounded-sm border border-hairline bg-raised flex items-center justify-center text-ink-2 group-hover:text-accent-soft transition-colors duration-500">
            <Icon size={15} strokeWidth={1.5} />
          </span>
          <span className="mono-micro text-ink-4 tabular">{index}</span>
        </div>

        <h3 className="display-md text-ink mt-7">{title}</h3>

        <p className="mt-3 text-sm text-ink-2 leading-relaxed max-w-[38ch]">
          {description}
        </p>

        {/* Espaco para visual extra (usado pelo card grande) */}
        {children && <div className="mt-8 flex-1">{children}</div>}

        {/* Insight — sempre visivel */}
        <div className="mt-8 pt-5 border-t border-hairline-2 mt-auto">
          <span className="mono-micro text-accent-soft">Insight de IA</span>
          <p className="mt-2.5 text-[13px] text-ink-2 leading-relaxed">
            <span className="text-ink font-medium">{backTitle}.</span>{' '}
            {backContent}
          </p>
        </div>
      </div>
    </article>
  );
}
