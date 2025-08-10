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
import Head from "next/head";
import { getMessages, getTranslations } from "next-intl/server";
import type { Locale } from "@/types/app";
import {
  SITE_AUTHOR,
  SITE_NAME,
  SITE_URL,
  OG_IMAGE,
} from "@/constants/app-content";
import { LOCALE_MAP } from "@/constants/i18n";

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

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const tMeta = await getTranslations("Metadata");
  const tSite = await getTranslations("Site");
  const { locale } = params;

  return {
    title: `${tMeta("title")} | ${SITE_NAME}`,
    description: `${tSite("slogan")} — ${tSite("description")}`,
    keywords: tMeta("keywords").split(", "),
    authors: [SITE_AUTHOR],
    category: "Music",
    metadataBase: new URL(SITE_URL),
    openGraph: {
      type: "website",
      locale: LOCALE_MAP[locale],
      url: SITE_URL,
      siteName: SITE_NAME,
      title: tMeta("title"),
      description: `${tSite("slogan")} — ${tSite("description")}`,
      images: {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: tMeta("title"),
      description: `${tSite("slogan")} — ${tSite("description")}`,
      images: OG_IMAGE,
    },
    alternates: {
      canonical: SITE_URL,
      languages: {
        en: `${SITE_URL}/en`,
        pl: `${SITE_URL}/pl`,
        uk: `${SITE_URL}/ua`,
      },
      types: {
        "application/rss+xml": `${SITE_URL}/rss.xml`,
      },
    },
    other: {
      "msapplication-TileColor": "#ffffff",
      "theme-color": "#000000",
    },
  };
}

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
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="twitter:site" content={SITE_URL} />
        <meta property="twitter:creator" content="@colbyfayock" />
      </Head>
      <body
        suppressHydrationWarning
        className={`${primaryFont.variable} ${accentFont.variable} font-primary antialiased`}
      >
        <NextIntlClientProvider messages={await getMessages()}>
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
