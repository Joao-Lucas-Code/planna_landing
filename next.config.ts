import type { NextConfig } from "next";

// Cabecalhos de seguranca — a landing nao tem servidor proprio, entao eles
// sao a camada inteira de defesa. CSP pragmatico: partimos de 'self' e so
// abrimos o estritamente necessario (Supabase, backend de e-mail). O
// 'unsafe-inline' de style/script e exigencia do proprio Next: Tailwind v4
// inline, payload RSC e preload de fontes sao injetados em <style>/<script>
// inline; sem isso a pagina quebra.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // INSERT da waitlist (Supabase) + e-mail de boas-vindas (backend Django)
      "connect-src 'self' https://*.supabase.co https://novaflow-backend.onrender.com",
      "img-src 'self' data:",
      // Video do flamingo no hero
      "media-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline'",
      "font-src 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
