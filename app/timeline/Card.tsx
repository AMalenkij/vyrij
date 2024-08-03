'use client'

import { twMerge } from 'tailwind-merge'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import Link from 'next/link'

import { EVENTS_HASH_ENDPOINT } from '@/constants/settings'

import ImageWithEffects from './ImageWithEffects'

interface CardProps {
  year: number;
  description: string;
  imageSrc: string;
  className?: string;
}

export default function Card({
  year, description, imageSrc, className,
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => setIsHovered(false), [])

  return (
    <div className={twMerge('', className)}>
      <div
        className="flex flex-col items-center justify-center hoverCard"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href={EVENTS_HASH_ENDPOINT + year} className="relative overflow-hidden transform-gpu transition-transform" prefetch>
          <motion.div
            className="group"
            animate={isHovered ? {
              scale: 1.3,
              height: 430,
              width: 390,
              filter: 'grayscale(0%)',
              transition: { duration: 1 },
            } : {
              scale: 1,
              height: 400,
              width: 360,
              filter: 'grayscale(100%)',
              transition: { duration: 1 },
            }}
            initial={{ height: 400, width: 360 }}
          >
            <ImageWithEffects src={imageSrc} alt={String(year)} sizes="(max-width: 640px) 35vh, 40vh" />
          </motion.div>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: -220, scale: 0.9 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                className="absolute pl-4 pt-20 text-start text-static_white"
              >
                <p className="text-5xl">{year}</p>
                <p className="text-3xl">{description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>
    </div>
  )
}
