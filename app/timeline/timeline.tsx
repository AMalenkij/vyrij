'use client'

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

import { supabaseStorageURL } from '@/constants/settings'
import { CustomMajorEvents } from '@/types'
import VerticalTimelineLine from './VerticalTimelineLine'
import Card from './Card'

interface ResizeObserverEntry {
  contentRect: DOMRectReadOnly;
  target: Element;
}

export default function TimeLine({ majorEvent, children }:
{ majorEvent: CustomMajorEvents[], children: React.ReactNode }) {
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
      <div className="
      fixed
      inset-x-0
      will-change-transform
      "
      >
        {children}
        <motion.div
          ref={scrollRef}
          style={{ x: spring }}
          className="
          relative
          h-30vh
          w-max-content
          flex
          items-center
          ml-4
          pr-10
          md:pr-24
          mt-36
          md:mt-72
          md:ml-10"
        >
          <div className="
          relative
          flex
          "
          >
            {majorEvent.map((element) => (
              <div
                className="
              flex-col
              justify-center
              items-center
              mr-32
              "
                key={element.year}
              >
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
      <div ref={ghostRef} style={{ height: scrollRange }} />
    </>
  )
}
