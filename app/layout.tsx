import { Inter } from 'next/font/google'

import type { Metadata } from 'next'
import './globals.css'

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vyrij',
  description: 'choir Vyrij',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
