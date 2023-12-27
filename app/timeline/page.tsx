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

const timelineData = [
  {
    year: '2019',
    description: 'Описание событий в 2019 году',
    imageSrc: '/img/foto1.jpg',
  },
  {
    year: '2020',
    description: 'Описание событий в 2020 году',
    imageSrc: '/img/foto2.jpg',
  },
  {
    year: '2021',
    description: 'Описание событий в 2021 году',
    imageSrc: '/img/foto3.jpg',
  },
  {
    year: '2022',
    description: 'Описание событий в 2022 году',
    imageSrc: '/img/foto4.jpg',
  },
  {
    year: '2023',
    description: 'Описание событий в 2023 году',
    imageSrc: '/img/foto5.jpg',
  },
  {
    year: '2024',
    description: 'Описание событий в 2023 году',
    imageSrc: '/img/foto6.jpg',
  },
]

export function TimeLine() {
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
      {timelineData.map((data) => (
        <div className="flex-col justify-center items-center">
          <Card
            key={data.year}
            year={data.year}
            description={data.description}
            imageSrc={data.imageSrc}
          />
          <VerticalTimelineLine year={data.year} />
        </div>
      ))}
    </motion.main>
  )
}

export default React.memo(TimeLine)
