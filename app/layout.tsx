import { Poiret_One, Comforter } from 'next/font/google'

import type { Metadata } from 'next'
import './globals.css'
import MenuAnimationControl from '@/components/header/MenuAnimationControl'
import NavMenu from '@/components/header/NavMenu'
import NavMenuToggle from '@/components/header/NavMenuToggle'
import Logo from '@/components/Logo'
import SVGLogoVyrij from '@/public/svg/LogoVyrij'
import ThemeProvider from '@/providers/ThemeProvider'
import ModeToggle from '@/components/ModeToggle'
import { CHOR } from '@/constants/settings'

const comforter = Comforter({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  variable: '--font-comforter',
})
const poiretOne = Poiret_One({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  variable: '--font-poiret-one',
})

export const metadata: Metadata = {
  title: 'Vyrij',
  description: 'choir Vyrij',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${poiretOne.variable} ${comforter.variable} font-poiretOne tracking-wider`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
          text-white
          whitespace-nowrap
          "
              >
                {`${CHOR} | `}
                <SVGLogoVyrij />
              </Logo>
              <NavMenuToggle />
              <ModeToggle className="" />
            </nav>
            {children}
          </MenuAnimationControl>
          <MenuAnimationControl isOpen={false}>
            <NavMenu />
          </MenuAnimationControl>
        </ThemeProvider>
      </body>
    </html>
  )
}
