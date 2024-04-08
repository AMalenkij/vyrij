'use client'

import Card from '@/components/Card'
import VerticalTimelineLine from '@/components/VerticalTimelineLine'
import { supabaseStorageURL } from '@/constants/settings'
import { CustomMajorEvents } from '@/types'

import React, {
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'

interface ResizeObserverEntry {
  contentRect: DOMRectReadOnly;
  target: Element;
}

export default function TimeLine({ majorEvent }: { majorEvent: CustomMajorEvents[] }) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const ghostRef = useRef<HTMLDivElement | null>(null)
  const [scrollRange, setScrollRange] = useState<number>(0)
  const [viewportW, setViewportW] = useState<number>(0)

  useLayoutEffect(() => {
    if (scrollRef.current) {
      setScrollRange(scrollRef.current.scrollWidth)
    }
  }, [scrollRef])

  const onResize = useCallback((entries: ResizeObserverEntry[]) => {
    entries.forEach((entry) => {
      setViewportW(entry.contentRect.width)
    })
  }, [])

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(onResize)
    if (ghostRef.current) {
      resizeObserver.observe(ghostRef.current)
    }
    return () => resizeObserver.disconnect()
  }, [onResize])

  const { scrollYProgress } = useScroll()
  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -scrollRange + viewportW],
  )
  const physics = { damping: 15, mass: 0.27, stiffness: 55 }
  const spring = useSpring(transform, physics)

  return (
    <>
      <div className="scroll-container">
        <div className="absolute inset-0 bottom-auto text-center pointer-events-none mt-12 md:mt-28">
          <h2 className="text-12 md:text-14 md:mt-100 mt-12 my-10 md:my-65">Choose a year</h2>
        </div>
        <motion.div
          ref={scrollRef}
          style={{ x: spring }}
          className="thumbnails-container ml-4 pr-10 md:pr-24 mt-44 md:mt-72 md:ml-16"
        >
          <div className="thumbnails">
            {majorEvent.map((element) => (
              <div className="flex-col justify-center items-center  thumbnail" key={element.year}>
                <Card
                  year={element.year}
                  description={element.title}
                  imageSrc={`${supabaseStorageURL}${element.photos[0].href}`}
                />
                <VerticalTimelineLine year={element.year} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div ref={ghostRef} style={{ height: scrollRange }} className="ghost" />
    </>
  )
}
