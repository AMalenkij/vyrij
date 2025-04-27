import { Poiret_One, Great_Vibes } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'

import type { Metadata } from 'next'

import './globals.css'
import MenuAnimationControl from '@/components/header/MenuAnimationControl'
import NavMenu from '@/components/header/NavMenu'
import NavMenuToggle from '@/components/header/NavMenuToggle'
import Logo from '@/components/Logo'
import SVGLogoVyrij from '@/public/svg/LogoVyrij'
import ThemeProvider from '@/providers/ThemeProvider'
import ModeToggle from '@/components/ModeToggle'

const secondaryFont = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-secondaryFont',
})
const mainFont = Poiret_One({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  variable: '--font-mainFont',
})

export const metadata: Metadata = {
  title: 'Vyrij',
  description: 'choir Vyrij',
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages()
  const t = await getTranslations('Header')

  return (
    <html lang={locale}>
      <body className={`${mainFont.variable} ${secondaryFont.variable} font-mainFont tracking-wider`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <MenuAnimationControl isOpen>
              <nav className="
            fixed
            top-0
            left-0
            right-0
            flex
            justify-between
            items-center
            p-4
            mt-4
            lg:p-10
            z-50
            mix-blend-difference"
              >
                <Logo className="
          flex
          items-center
          gap-2
          text-xl
          xl:text-3xl
          rochester-regular
          h-10
          shrink-0
          w-28
          lg:w-44
          text-static_white
          whitespace-nowrap
          "
                >
                  {`${t('Chor')} | `}
                  <SVGLogoVyrij />
                </Logo>
                <NavMenuToggle />
                <ModeToggle
                  lightLabel={t('ModeToggle.lightLabel')}
                  darkLabel={t('ModeToggle.darkLabel')}
                  systemLabel={t('ModeToggle.systemLabel')}
                />
              </nav>
              {children}
            </MenuAnimationControl>
            <MenuAnimationControl isOpen={false}>
              <NavMenu />
            </MenuAnimationControl>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
