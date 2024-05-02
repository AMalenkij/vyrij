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

  return (
    <div
      className="flex flex-col items-center justify-center hoverCard"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/event/#${year}`} className={twMerge('relative overflow-hidden transform-gpu transition-transform ', className)}>
        <motion.div
          className="group"
          animate={isHovered ? {
            scale: 1.3, height: 450, width: 410, transition: { duration: 1 },
          } : {}}
          initial={{ height: 440, width: 400 }}
        >
          <Image
            src={imageSrc}
            alt={String(year)}
            sizes="40vh"
            fill
            style={{
              objectFit: 'none',
            }}
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
