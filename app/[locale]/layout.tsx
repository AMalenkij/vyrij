import { NextIntlClientProvider, hasLocale } from "next-intl";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import "@/app/globals.css";
import noiseTransparent from "@/public/img/noiseTransparent.png";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { Marmelad, Great_Vibes } from "next/font/google";

const primaryFont = Marmelad({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-primary",
});

const accentFont = Great_Vibes({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-accent",
});

export const metadata: Metadata = {
  title: "Vyrij",
  description: "choir Vyrij",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Проверяем, что локаль поддерживается
  // if (!routing.locales.includes(locale as "en" | "pl" | "ua")) {
  //   notFound();
  // }

  // Получаем сообщения для текущей локали
  // const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${primaryFont.variable} ${accentFont.variable} bg-stone-950 font-primary text-stone-200 antialiased`}
      >
        {/*<NextIntlClientProvider messages={messages}>*/}
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div
              className="pointer-events-none fixed inset-0 z-[100] animate-noise opacity-90"
              style={{
                background: `transparent url(${noiseTransparent.src}) repeat 0 0`,
                backgroundSize: "300px 300px",
                willChange: "transform",
              }}
            />
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
