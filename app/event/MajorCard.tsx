'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import RenderPhotos from './RenderPhotos'

export interface MajorEvent {
  year: number;
  title: string;
  photos: { href: string }[];
}

export default function MajorCard({ majorEvent }:{ majorEvent:MajorEvent }) {
  const { year, title, photos } = majorEvent

  const refFM = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: refFM,
    offset: ['0', '1 0.9'],
  })
  const scaleProgressImg = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  const scaleProgressText = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  return (
    <motion.div
      className="relative h-[200vh] mb-96"
      ref={refFM}
      style={{
        scale: scaleProgressImg,
      }}
      id={year.toString()}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <div>
          {RenderPhotos({ photos, limit: 1, className: 'w-full h-screen relative' })}
        </div>
        <div className="absolute inset-0 flex justify-center items-center text-white text-2xl font-bold pb-56 md:mb-5">
          {year}
          p
        </div>
        <motion.div
          className="absolute inset-0 flex flex-col justify-center items-center text-white text-9xl font-comforter"
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
