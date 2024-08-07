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

interface ResizeObserverEntry {
  contentRect: DOMRectReadOnly;
  target: Element;
}

export default function WithTimeLineAnimation({ title, timelineContent }:
{ title: React.ReactNode, timelineContent:React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)
  const [scrollRange, setScrollRange] = useState(0)
  const [viewportW, setViewportW] = useState(0)

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
  const physics = { damping: 15, mass: 0.5, stiffness: 55 }
  const spring = useSpring(transform, physics)
  return (
    <>
      <div className="
      sticky
      inset-x-0
      top-20
      "
      >
        {title}
        <motion.div
          ref={scrollRef}
          style={{ x: spring }}
          className="
          flex
          ml-10
          mt-36
          sm:mt-48
          md:mt-72
          "
        >
          <div className="relative flex">{timelineContent}</div>
        </motion.div>
      </div>
      <div ref={ghostRef} style={{ height: scrollRange }} />
    </>
  )
}
