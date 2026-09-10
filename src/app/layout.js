import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

// Display: Syne. Pesos 600/700/800 — 600 cobre os titulos menores.
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["600", "700", "800"],
  display: "swap",
});

// Texto corrido
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["400", "500"],
  display: "swap",
});

// Microtexto: eyebrows, indices de secao, labels de dado
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-ui",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata = {
  // metadataBase resolve as URLs relativas (canonical, OG, twitter) contra
  // o dominio publico — sem ele o Next advinha a origem a cada request.
  metadataBase: new URL('https://novaflow.me'),
  alternates: { canonical: '/' },
  title: 'Planna.IA - Gestão Financeira com IA | NovaFlow',
  description: 'O Planna.IA analisa seus gastos, otimiza seus investimentos e entrega insights em tempo real com inteligência artificial. Um produto da NovaFlow.',
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
    title: 'Planna.IA - Sua gestão financeira inteligente',
    description: 'A revolução das suas finanças chegou. Entre na lista de espera do Planna.IA, o agente financeiro com IA da NovaFlow.',
    url: 'https://novaflow.me',
    siteName: 'Planna.IA',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: 'https://novaflow.me/og-image.png', width: 1200, height: 630, alt: 'Planna.IA — Gestão financeira inteligente, um produto NovaFlow' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Planna.IA - Sua gestão financeira inteligente',
    description: 'A revolução das suas finanças chegou. Entre na lista de espera do Planna.IA, o agente financeiro com IA da NovaFlow.',
    images: ['https://novaflow.me/og-image.png'],
  },
};

export const viewport = {
  themeColor: '#0B0709',
  colorScheme: 'dark',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${syne.variable} ${dmSans.variable} ${mono.variable}`}
    >
      <body className="bg-canvas text-ink antialiased">
        {/* Pula direto para o conteudo — navegacao por teclado */}
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-ink focus:text-ink-inv focus:px-4 focus:py-2 focus:rounded-sm focus:text-sm"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
