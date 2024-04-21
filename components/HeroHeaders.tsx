'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

import { HERO_TEXT, QUOTE_TEXT, AUTOR } from '@/constants/settings'
import imgHero from '@/public/img/Hero.jpg'

export default function HeroHeaders() {
  return (
    <div className="
    relative
    flex
    flex-col
    md:flex-row
    items-center
    justify-center
    p-30
    md:p-52"
    >
      <div className="
      md:flex
      mx-auto
      justify-center
      w-7/12
      "
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <Image
            src={imgHero}
            width={688} // 688 origin
            height={459} // 459 origin
            alt="Hero img"
          />
        </motion.div>
        <div className="
      md:w-1/3
      md:flex-none
      text-gray"
        >
          <article className="
        md:-ml-96
        mb-10
        md:mb-18
        relative
        md:mr-auto
        mt-4
        "
          >
            <motion.p
              className="text-8xl font-comforter"
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
          </article>
          <article className="
        max-w-380
        md:ml-55
        px-30
        md:px-0
        text-center
        md:text-left
        md:mr-auto
        mb-10"
          >
            <motion.p
              className="ml-6 -mt-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 2,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              {HERO_TEXT}
            </motion.p>
          </article>

        </div>
      </div>
    </div>
  )
}
