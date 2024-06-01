'use client'

import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

interface LogoProps {
  children: React.ReactNode
  className?: string
}
export default function WithMotion({ children, className } : LogoProps) {
  return (
    <motion.div
      className={twMerge(
        `
        `,
        className,
      )}
      initial={{ opacity: 0, y: 70 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, ease: [0, 0.71, 0.2, 1.01] }}
    >
      { children }
    </motion.div>
  )
}
