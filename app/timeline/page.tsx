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
import useModelData from '@/hooks/useModelData'
import getMajorEvent from '@/actions/getMajorEvent'
import { supabaseStorageURL } from '@/constants/settings'

export function TimeLine() {
  const { ...data } = useModelData(getMajorEvent, 1)
  // console.log(data.modelData)
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
      {data.modelData.map((element) => (
        <div className="flex-col justify-center items-center">
          <Card
            key={element.minor_event.date}
            year={element.minor_event.date.slice(0,4)}
            description={element.minor_event.title}
            imageSrc={`${supabaseStorageURL}${element.minor_event.photos[0].href}`}
          />
          <VerticalTimelineLine year={element.minor_event.date.slice(0,4)} />
        </div>
      ))}
    </motion.main>
  )
}

export default React.memo(TimeLine)
