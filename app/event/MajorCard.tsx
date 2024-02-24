'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import { CustomMajorEvents } from '@/types'
import RenderPhotos from './RenderPhotos'

export default function MajorCard({ majorEvents }:{ majorEvents:CustomMajorEvents }) {
  const { year, title, photos } = majorEvents

  const refFM = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: refFM,
    offset: ['0', '1 0.9'],
  })

  const scaleProgressImg = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  const scaleProgressText = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <motion.div
      className="
      relative
      2xl:mb-80
      xl:mb-72
      lg:mb-64
      mb-60
      "
      ref={refFM}
      style={{
        scale: scaleProgressImg,
        height: '200vh',
      }}
      id={year.toString()}
    >
      <div className="
      sticky
      top-0
      w-full
      h-screen
      overflow-hidden
      "
      >
        <div>
          {RenderPhotos({ photos, limit: 1, className: 'min-w-full  max-w-full h-screen relative' })}
        </div>
        <div className="
        absolute
        inset-0
        flex
        justify-center
        items-center
        text-white
        2xl:text-2xl
        lg:text-xl
        text-lg
        font-bold
        2xl:pb-56
        xl:pb-40
        pb-32
        md:mb-5"
        >
          {year}
          p
        </div>
        <motion.div
          className="
          absolute
          inset-0
          flex
          flex-col
          justify-center
          items-center
          text-white
          2xl:text-9xl
          xl:text-8xl
          lg:text-7xl
          text-6xl
          font-comforter
          whitespace-normal
          "
          style={{
            scale: scaleProgressText,
          }}
        >
          {title}
        </motion.div>
      </div>
    </motion.div>
  )
}
