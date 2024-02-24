'use client'

import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react'
import { motion } from 'framer-motion'

import useMousePosition from '@/utils/useMousePosition'
import Card from '@/components/Card'
import VerticalTimelineLine from '@/components/VerticalTimelineLine'
import { supabaseStorageURL } from '@/constants/settings'
import { CustomMajorEvents } from '@/types'

export function TimeLine({ majorEvent }: { majorEvent: CustomMajorEvents[] }) {
  const [x, setX] = useState(0)
  const mousePosition = useMousePosition()
  const requestRef = useRef<number | null>(null)

  const handleAnimation = useCallback(() => {
    const screenWidth = window.innerWidth
    const leftZone = screenWidth / 3
    const rightZone = (2 * screenWidth) / 3

    let scrollDirection = 0
    let cursorPositionCoefficient = 0.5

    const minLimit = -500
    const maxLimit = 500

    if (mousePosition.x < leftZone) {
      scrollDirection = 1
      cursorPositionCoefficient = 1 - mousePosition.x / leftZone
    } else if (mousePosition.x > rightZone) {
      scrollDirection = -1
      cursorPositionCoefficient = (mousePosition.x - rightZone) / (screenWidth - rightZone)
    }

    const newScrollLeft = x + scrollDirection * cursorPositionCoefficient * 5

    const clampedScrollLeft = Math.min(maxLimit, Math.max(minLimit, newScrollLeft))

    setX(clampedScrollLeft)
    requestRef.current = requestAnimationFrame(handleAnimation)
  }, [mousePosition.x, x])

  useEffect(() => {
    requestRef.current = requestAnimationFrame(handleAnimation)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [handleAnimation])
  return (
    <motion.main animate={{ x }} className="flex gap-12">
      {majorEvent.map((element) => (
        <div className="flex-col justify-center items-center">
          <Card
            key={element.year}
            year={element.year}
            description={element.title}
            imageSrc={`${supabaseStorageURL}${element.photos[0].href}`}
          />
          <VerticalTimelineLine year={element.year} />
        </div>
      ))}
    </motion.main>
  )
}

export default React.memo(TimeLine)
