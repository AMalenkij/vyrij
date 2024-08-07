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
    offset: ['start end', 'end start'],
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
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="relative w-full h-full"
          style={{ scale: scaleProgressImg }}
        >
          {children}
        </motion.div>
        <div
          className="absolute inset-0 flex flex-col justify-center items-center"
        >
          <div className="text-static_white font-bold 2xl:text-2xl lg:text-base text-sm mb-12">
            {year}
          </div>
          <div className="text-static_white font-secondaryFont whitespace-normal lg:px-28 px-10 2xl:text-10xl xl:text-9xl lg:text-8xl text-7xl text-center">
            {title}
          </div>
        </div>
      </div>
    </div>
  )
}
