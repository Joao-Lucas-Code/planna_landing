import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"], // Pesos pesados para o título
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500"],
});

// AQUI ESTÁ A MÁGICA DO SEO E DOS FAVICONS
export const metadata = {
  title: 'PlannaIA - Gestão Financeira com IA | NovaFlow',
  description: 'O PlannaIA analisa seus gastos, otimiza seus investimentos e entrega insights em tempo real com inteligência artificial. Um produto da NovaFlow.',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    title: 'PlannaIA - Sua gestão financeira inteligente',
    description: 'A revolução das suas finanças chegou. Entre na lista de espera do PlannaIA, o agente financeiro com IA da NovaFlow.',
    url: 'https://novaflow.me',
    siteName: 'PlannaIA',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: 'https://novaflow.me/og-image.png', width: 1200, height: 630, alt: 'PlannaIA — Gestão financeira inteligente, um produto NovaFlow' }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="bg-black text-white antialiased font-dm">
        {children}
        {/* Componentes da Vercel para monitoramento de tráfego e velocidade */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}