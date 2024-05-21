'use client'

import { motion } from 'framer-motion'

import useMenuOpen from '@/hooks/useMenuOpen'

export default function MenuAnimationControl({ children, isOpen }:
{ children: React.ReactNode, isOpen: boolean }) {
  const { isOpen: menuIsOpen } = useMenuOpen()
  const shouldRender = isOpen ? menuIsOpen : !menuIsOpen

  return (

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {shouldRender && children}
    </motion.div>
  )
}
