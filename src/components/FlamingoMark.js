/**
 * Marca Planna.IA — flamingo que forma um P.
 *
 * A perna e a borda esquerda do pescoco compartilham a mesma vertical,
 * formando a haste do P; o corpo somado ao arco do pescoco forma o bojo.
 *
 * Logo responsivo: abaixo de ~32px o olho e o bico fino viram sujeira, entao
 * `variant="compact"` engrossa os tracos e descarta o que nao sobrevive.
 * Use "compact" para favicon e qualquer render <= 32px.
 */

const ROSA = 'currentColor';
const BICO = '#8E1E43';
const PONTA = '#240811';

export default function FlamingoMark({
  size = 32,
  variant = 'full',
  mono = false,
  className = '',
  title,
  ...props
}) {
  const compacto = variant === 'compact';

  // `mono` faz bico e olho herdarem currentColor. Sem isso eles ficam com
  // fill fixo e NAO acompanham a opacidade do pai — uma marca d'agua a 5%
  // aparecia com o bico opaco, como uma cunha solta sobre o titulo.
  const corBico = mono ? 'currentColor' : BICO;
  const corPonta = mono ? 'currentColor' : PONTA;

  return (
    <svg
      width={size}
      height={(size * 84) / 64}
      viewBox="0 0 64 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title && <title>{title}</title>}

      {compacto ? (
        <>
          {/* Corpo + pescoco + perna num unico contorno, tracos engrossados */}
          <path
            d="M15 76 L15 30 C15 14 25 3 38 3 C48 3 55 9 55 16 L44 17
               C44 13 42 11 38 11 C31 11 26 19 26 31
               C35 27 47 30 52 37 C58 45 55 56 45 60
               C36 63 24 62 15 58 Z"
            fill={ROSA}
          />
          <path
            d="M55 16 C60 19 62 25 60 31 C56 26 51 21 47 18 Z"
            fill={corBico}
          />
          <path
            d="M15 76 L26 76 L26 60 L15 60 Z"
            fill={ROSA}
          />
          <path d="M12 78 L30 78" stroke={ROSA} strokeWidth="6" strokeLinecap="round" />
        </>
      ) : (
        <>
          {/* Contorno principal: haste (perna + borda esquerda do pescoco),
              arco do pescoco, cabeca e corpo — tudo continuo. */}
          <path
            d="M17 74 L17 30 C17 16 25 6 37 5 C46 4 52 9 52 15 L44 16
               C44 12 41 10 37 11 C30 12 26 20 26 31
               C34 28 45 30 50 36 C56 43 54 54 45 58
               C38 61 31 60 26 58 L26 74 Z"
            fill={ROSA}
          />
          {/* Bico em gancho, rosa profundo — nunca preto: em tamanho pequeno
              um bico preto lê como defeito na letra, não como bico. */}
          <path
            d="M52 15 C56 17 58 22 57 26 C54 23 50 19 47 17 Z"
            fill={corBico}
          />
          <path d="M57 26 L55.6 22.5 L58 25.5 Z" fill={corPonta} />
          {!mono && <circle cx="46.5" cy="12.5" r="1.7" fill={PONTA} />}
          {/* Pé */}
          <path d="M14 76 L29 76" stroke={ROSA} strokeWidth="5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

/** Lockup horizontal: marca + wordmark. Usado na navbar e no rodapé. */
export function FlamingoLockup({ size = 28, className = '', textClassName = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <FlamingoMark size={size} className="text-flamingo shrink-0" />
      <span
        className={`font-display font-extrabold tracking-tight leading-none ${textClassName}`}
      >
        Planna<span className="text-flamingo">.IA</span>
      </span>
    </span>
  );
}
