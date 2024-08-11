'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

import { arrowMotion } from '@/utils/animations'
import { TIMELINE_ROUTE } from '@/constants/settings'

interface LinkMainPageProps {
  text: string;
  Icon: React.ReactNode;
}

export default function LinkMainPage({ text, Icon }: LinkMainPageProps) {
  return (
    <motion.div whileHover="hover">
      <Link href={TIMELINE_ROUTE} className="flex items-center justify-center -mt-40 text-4xl gap-3 font-secondaryFont" prefetch>
        {text}
        <motion.div variants={arrowMotion}>
          {Icon}
        </motion.div>
      </Link>
    </motion.div>
  )
}
