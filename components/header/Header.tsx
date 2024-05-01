'use client'

import { twMerge } from 'tailwind-merge'
import { AnimatePresence } from 'framer-motion'

import Logo from '@/components/Logo'
import NavMenuToggle from '@/components/header/NavMenuToggle'
import NavMenu from '@/components/header/NavMenu'
import useMenuOpen from '@/hooks/useMenuOpen'
import SVGLogoVyrij from '@/public/svg/LogoVyrij'

interface HeaderProps {
  className?: string
}
export default function Header({ className } : HeaderProps) {
  const { isOpen } = useMenuOpen()

  return (
    <header className={twMerge(
      `
      grid 
      grid-cols-3 
      relative 
      z-[100]
    `,
      className,
    )}
    >
      <AnimatePresence>{isOpen && <NavMenu />}</AnimatePresence>
      <Logo>
        Chor |
        <SVGLogoVyrij />
      </Logo>
      <NavMenuToggle />
    </header>
  )
}
