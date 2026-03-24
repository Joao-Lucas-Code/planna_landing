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
  title: 'Planna.AI | O seu agente financeiro inteligente',
  description: 'Analise seus gastos, otimize seus investimentos e receba insights em tempo real com inteligência artificial.',
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
    title: 'Planna.AI | O seu agente financeiro inteligente',
    description: 'A revolução das suas finanças chegou. Entre na lista de espera.',
    url: 'https://novaflow.me',
    siteName: 'Planna.AI',
    locale: 'pt_BR',
    type: 'website',
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