'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

import {
  arrowMotion,
  itemCoverMotion,
  dividerMotion,
  itemContentMotion,
} from '@/utils/animations'
import useMenuOpen from '@/hooks/useMenuOpen'
import Arrow from '../../public/svg/Arrow'

interface PropNavMenuItem {
  index:number
  title:string
  active?:boolean
  href:string
}

export default function NavMenuItem({
  index, title, active, href,
}: PropNavMenuItem) {
  const [isLoading, setIsLoading] = useState(true)
  const { isOpen, onOpen, onClose } = useMenuOpen()

  return (
    <motion.li
      className={`cursor-pointer py-8 relative w-full ${
        isLoading ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onAnimationComplete={() => setIsLoading(false)}
    >
      <Link
        className="flex items-center relative w-full"
        href={href}
        onClick={isOpen ? onClose : onOpen}
        type="button"
      >
        <motion.div
          className=" bg-primary-foreground"
          variants={itemCoverMotion}
        />
        <motion.span
          className="w-[4ch] text-2xl sm:text-3xl md:text-4xl"
          variants={itemContentMotion}
        >
          (
          {index.toLocaleString('en-US', { minimumIntegerDigits: 2 })}
          )
        </motion.span>
        <h1 className="uppercase tracking-wide text-4xl sm:text-5xl md:text-6xl flex-1">
          {title}
        </h1>
        <motion.div variants={arrowMotion}>
          <div className="h-6 w-6">
            <Arrow />
          </div>
        </motion.div>
      </Link>
      <motion.div
        className={twMerge('absolute bottom-0 h-[2px] bg-border w-full origin-left', active && 'bg-red-700')}
        variants={dividerMotion}
      />
    </motion.li>
  )
}
