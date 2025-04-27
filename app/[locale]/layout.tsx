import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/general/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

// import { getMessages, locales, Locale, defaultLocale } from "@/config/i18n";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";

import { routing } from "@/i18n/routing";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // Vous devez attendre la résolution des paramètres
  // const resolvedParams = await Promise.resolve(params);
  // const { locale } = resolvedParams;
  const { locale } = params;
  return {
    title: locale === "fr" ? "AFRIQUE AVENIR EMPLOIS" : "AFRIQUE AVENIR JOBS",
    description:
      locale === "fr"
        ? "Afrique Avenir Emploi connecte les employeurs et les talents à travers l'Afrique via une plateforme intuitive d'annonces et de recherche d'emploi."
        : "Afrique Avenir Job connects employers and talents across Africa through an intuitive platform for job posting and searching.",
    icons: {
      icon: "/favicon.ico",
    },
  };
}

// export function generateStaticParams() {
//   return locales.map((locale) => ({ locale }));
// }

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // params: Promise<{ locale: string }>;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  // const { locale } = await params;
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster
              position="top-right"
              duration={3000}
              visibleToasts={3}
              expand
              closeButton
              richColors
            />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
