'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

import { arrowMotion } from '@/utils/animations'

interface LinkMainPageProps {
  text: string;
  Icon: React.ReactNode;
}

export default function LinkMainPage({ text, Icon }: LinkMainPageProps) {
  return (
    <motion.div whileHover="hover" className="hidden lg:block">
      <Link href="timeline" className="flex items-center justify-center -mt-40 text-3xl gap-3" prefetch>
        {text}
        <motion.div variants={arrowMotion}>
          {Icon}
        </motion.div>
      </Link>
    </motion.div>
  )
}
