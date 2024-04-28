import { Poiret_One, Comforter } from 'next/font/google'

import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/header/Header'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'

// const font = Inter({ subsets: ['latin'] })
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
        <SupabaseProvider>
          <ToasterProvider />
          <UserProvider>
            <ModalProvider />
            <Header />
            {children}
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
