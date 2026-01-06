import type { Metadata } from "next";
import { Playfair_Display, IM_Fell_English } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import YouTubeAudio from "@/components/YouTubeAudio";
import FloatingTechBackground from "@/components/FloatingTechBackground";
import AppWrapper from "@/components/AppWrapper";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const imFell = IM_Fell_English({
  variable: "--font-imfell",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://noel-yando-fotso.dev'),
  title: {
    default: 'Noel Junior Yando Fotso | Data Engineer & Future Nanotechnologist',
    template: '%s | Noel Yando Fotso'
  },
  description: 'Portfolio de Noel Junior Yando Fotso - Data Engineer passionne par les technologies du vivant et la nanotechnologie. Specialise en pipelines de donnees, imagerie medicale et systemes embarques.',
  keywords: [
    'Data Engineer', 'Nanotechnology', 'BioInformatics', 'Python', 'TypeScript',
    'Machine Learning', 'Medical Imaging', 'IoT', 'Full Stack Developer',
    'EPHEC', 'Belgium', 'Noel Yando Fotso'
  ],
  authors: [{ name: 'Noel Junior Yando Fotso' }],
  creator: 'Noel Junior Yando Fotso',
  openGraph: {
    type: 'website',
    locale: 'fr_BE',
    alternateLocale: ['en_US', 'nl_BE'],
    title: 'Noel Junior Yando Fotso | Data Engineer',
    description: 'Portfolio - Data Engineering, Medical Imaging & Nanotechnology',
    siteName: 'Portfolio Noel Yando Fotso',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Noel Junior Yando Fotso | Data Engineer',
    description: 'Portfolio - Data Engineering, Medical Imaging & Nanotechnology',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="light scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#8B4513" />
      </head>
      <body
        className={`${playfair.variable} ${imFell.variable} antialiased bg-[var(--background)] text-[var(--foreground)] min-h-screen transition-colors duration-300`}
      >
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <AppWrapper>
              {/* Global Floating Tech Background - Living organic network */}
              <FloatingTechBackground />
              {/* Skip to main content - Accessibility */}
              <a
                href="#main-content"
                className="skip-link focus:top-0"
              >
                Skip to main content
              </a>

              <Navbar />

              <main id="main-content" className="pt-16 relative z-10" role="main">
                {children}
              </main>

              <Footer />

              {/* YouTube Audio Player - Wakanda Origins */}
              <YouTubeAudio />
            </AppWrapper>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
