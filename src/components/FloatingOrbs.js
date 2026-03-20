export default function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Orb Roxa */}
      <div className="absolute top-[10%] left-[8vw] w-[650px] h-[650px] bg-purple-600/20 rounded-full blur-[90px] animate-pulse" />
      {/* Orb Azul */}
      <div className="absolute top-[8%] right-[8vw] w-[550px] h-[550px] bg-blue-600/20 rounded-full blur-[90px] animate-pulse delay-700" />
      {/* Orb Inferior */}
      <div className="absolute bottom-[10%] left-[20vw] w-[750px] h-[750px] bg-indigo-600/15 rounded-full blur-[100px] animate-pulse delay-1000" />
    </div>
  );
}