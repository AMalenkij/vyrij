'use client'

import React, {
  ReactNode, useRef, useCallback, useEffect,
} from 'react'
import {
  motion, useScroll, useTransform, useInView,
} from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'

import { EVENTS_YEAR_QUERY_ENDPOINT, YEAR } from '@/constants/settings'

interface MajorCardProps {
  year: number
  title: string
  children: ReactNode
}

export default function MajorCard({ year, title, children }: MajorCardProps) {
  const refFM = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const isInView = useInView(refFM, { amount: 0.5 })

  const { scrollYProgress } = useScroll({
    target: refFM,
    offset: ['0', '1 0.9'],
  })

  const scaleProgressImg = useTransform(scrollYProgress, [0, 1], [1, 1.25])

  const updateURL = useCallback(() => {
    if (isInView) {
      const currentYear = searchParams.get(YEAR)
      if (currentYear !== year.toString()) {
        const newUrl = `${EVENTS_YEAR_QUERY_ENDPOINT}${year}`
        router.replace(newUrl, { scroll: false })
      }
    }
  }, [isInView, year, searchParams, router])

  useEffect(() => {
    updateURL()
  }, [updateURL])

  return (
    <div
      className="relative h-[200vh]"
      id={year.toString()}
      ref={refFM}
    >
      <div className="absolute inset-0">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            className="relative w-full h-full"
            style={{ scale: scaleProgressImg }}
          >
            {children}
          </motion.div>
        </div>
        <div className="sticky top-0 h-screen flex flex-col justify-center items-center mx-30 md:mx-50">
          <div className="absolute inset-0 flex justify-center items-center text-white font-bold 2xl:text-2xl lg:text-base text-sm 2xl:pb-56 xl:pb-40 pb-48 md:mb-5">
            {year}
          </div>
          <motion.div className="absolute inset-0 flex flex-col justify-center items-center text-white font-comforter whitespace-normal px-16 2xl:text-9xl xl:text-8xl lg:text-7xl text-6xl">
            {title}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
