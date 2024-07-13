'use client'

import { twMerge } from 'tailwind-merge'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

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
  const [isLoading, setLoading] = useState(true)

  return (
    <div
      className="flex flex-col items-center justify-center hoverCard"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/event/#${year}`} className={twMerge('relative overflow-hidden transform-gpu transition-transform ', className)} prefetch>
        <motion.div
          className="group"
          animate={isHovered ? {
            scale: 1.3, height: 430, width: 390, transition: { duration: 1 },
          } : {}}
          initial={{ height: 400, width: 360 }}
        >
          <Image
            src={imageSrc}
            alt={String(year)}
            sizes="40vh"
            fill
            style={{
              objectFit: 'none',
            }}
            className={twMerge(
              'duration-700 ease-in-out group-hover:opacity-90 object-cover ',
              isLoading
                ? 'scale-110 blur-2xl grayscale'
                : 'scale-100 blur-0 grayscale-0',
            )}
            onLoadingComplete={() => setLoading(false)}
          />

        </motion.div>
        {isHovered ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: -130, scale: 0.9 }}
            transition={{ duration: 1.2 }}
            className="
        absolute
        pl-4
        pt-12
        text-start
        "
          >
            <p className="text-4xl text-start text-white">{year}</p>
            <p className="text-xl text-white">{description}</p>
          </motion.div>
        ) : null}
      </Link>
    </div>
  )
}
