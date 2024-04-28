// import { Inter } from 'next/font/google'
import { Comforter } from 'next/font/google'

import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/header/Header'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'

// const font = Inter({ subsets: ['latin'] })
const comforter = Comforter({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-comforter',
})

export const metadata: Metadata = {
  title: 'Vyrij',
  description: 'choir Vyrij',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${comforter.variable} overflow-x-hidden `}>
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
