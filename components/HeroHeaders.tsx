'use client'

import { motion } from 'framer-motion'

import { QUOTE_TEXT, QUOTE_TEXT_NEXT, AUTOR } from '@/constants/settings'

export default function HeroHeaders() {
  return (
    <div className="
    flex
    flex-col
    items-center
    justify-center
    p-30
    md:p-52
    text-center
    gap-y-8
    font-poiretOne
    mt-40
    "
    >
      <motion.p
        className="text-8xl inner-shadow"
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        {QUOTE_TEXT}
      </motion.p>
      <motion.p
        className="text-8xl underline decoration-sky-500/30"
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        {QUOTE_TEXT_NEXT}
      </motion.p>
      <motion.p
        className="text-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 2.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        {AUTOR}
      </motion.p>
    </div>
  )
}
