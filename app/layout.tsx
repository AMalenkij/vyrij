import { Poiret_One, Comforter } from 'next/font/google'

import type { Metadata } from 'next'
import './globals.css'
import MenuAnimationControl from '@/components/header/MenuAnimationControl'
import NavMenu from '@/components/header/NavMenu'
import NavMenuToggle from '@/components/header/NavMenuToggle'
import Logo from '@/components/Logo'
import SVGLogoVyrij from '@/public/svg/LogoVyrij'

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
      <body className={`${poiretOne.variable} ${comforter.variable} overflow-x-hidden font-poiretOne tracking-wider bg-white`}>
        <NavMenuToggle />
        <MenuAnimationControl isOpen>
          <Logo className="
          fixed
          top-10
          left-8
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
          whitespace-nowrap
        text-white
          mix-blend-difference
          z-50
          "
          >
            Chor |
            <SVGLogoVyrij />
          </Logo>
          {children}
        </MenuAnimationControl>
        <MenuAnimationControl isOpen={false}>
          <NavMenu />
        </MenuAnimationControl>
      </body>
    </html>
  )
}
