'use client'

import React, { ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function MajorCard({ year, title, children }:
{ year:number, title: string, children:ReactNode }) {
  const refFM = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: refFM,
    offset: ['0', '1 0.9'],
  })

  const scaleProgressImg = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  return (
    <div
      className="relative h-screen"
      style={{ height: '200vh' }}
      id={year.toString()}
      ref={refFM}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0">
          <div className="sticky top-0 w-full h-screen overflow-hidden">
            <motion.div
              className="relative overflow-hidden w-full h-full"
              style={{
                scale: scaleProgressImg,
              }}
            >
              {children}
            </motion.div>
          </div>
        </div>
        <div className="sticky top-0 h-screen flex flex-col justify-center items-center mx-30 md:mx-50">
          <div className="
        absolute
        inset-0
        flex
        justify-center
        items-center
        2xl:text-2xl
        lg:text-base
        text-white
        text-sm
        font-bold
        2xl:pb-56
        xl:pb-40
        pb-48
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
          px-16
          "
          >
            {title}
          </motion.div>
        </div>

      </div>
    </div>
  )
}
