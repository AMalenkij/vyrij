'use client'

import { AnimatePresence } from 'framer-motion'
import useMenuOpen from '@/hooks/useMenuOpen'

export default function MenuAnimationControl({ children } : { children: React.ReactNode }) {
  const { isOpen } = useMenuOpen()
  return <AnimatePresence>{isOpen && children}</AnimatePresence>
}
