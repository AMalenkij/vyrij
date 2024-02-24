import { twMerge } from 'tailwind-merge'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

interface CardProps {
  year: string;
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
      className="flex flex-col items-center justify-center bg-blue-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/event/#${year}`} className={twMerge('relative overflow-hidden transform-gpu transition-transform ', className)}>
        <motion.div
          className="group"
          animate={isHovered ? {
            scale: 2, height: 310, width: 270, transition: { duration: 1 },
          } : {}}
          initial={{ height: 300, width: 260 }}
        >
          <Image
            src={imageSrc}
            alt={year}
            sizes="15vh"
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
        flex-col
        justify-end
        p-4
        text-center
        "
          >
            <div className="text-4xl text-blue-700">{year}</div>
            <div className="text-xl text-blue-700">{description}</div>
          </motion.div>
        ) : null}
      </Link>
    </div>
  )
}
