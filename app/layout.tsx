import { Poiret_One, Comforter } from 'next/font/google'

import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/header/Header'

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
      <body className={`${poiretOne.variable} ${comforter.variable} overflow-x-hidden `}>
        <Header />
        {children}
      </body>
    </html>
  )
}
