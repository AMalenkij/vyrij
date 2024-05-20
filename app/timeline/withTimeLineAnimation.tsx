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

import ControlledScrollIcon from '@/components/scroll/ControlledScrollIcon'

interface ResizeObserverEntry {
  contentRect: DOMRectReadOnly;
  target: Element;
}

export default function WithTimeLineAnimation({ children }: { children: React.ReactNode }) {
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
        <div className="
        text-center
        pointer-events-none
        mt-6
        md:mt-12
        "
        >
          <h2 className="
          text-2xl
          md:text-3xl
          md:mt-100
          my-6
          md:my-65"
          >
            Choose a year
          </h2>
          <ControlledScrollIcon />
        </div>
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
          <div className="relative flex">
            {children}
          </div>
        </motion.div>
      </div>
      <div ref={ghostRef} style={{ height: scrollRange }} />
    </>
  )
}
