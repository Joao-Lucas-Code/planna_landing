export default function HeroOrbit() {
  // Objeto abstrato em CSS puro: aneis orbitais inclinados + nucleo de glow.
  // Sem JS, sem libs — animacao via CSS (ver globals.css). aria-hidden por ser decorativo.
  return (
    <div className="hero-orbit" aria-hidden="true">
      <div className="orbit-core" />
      <div className="orbit-ring orbit-ring-1" />
      <div className="orbit-ring orbit-ring-2" />
      <div className="orbit-ring orbit-ring-3" />
    </div>
  );
}
