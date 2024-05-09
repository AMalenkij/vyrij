'use client'

import { motion } from 'framer-motion'

export default function AnimatedContainer({ children }:{ children:JSX.Element }) {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ease: 'easeOut', duration: 1 }}
      viewport={{ once: false }}
    >
      {children}
    </motion.div>
  )
}
