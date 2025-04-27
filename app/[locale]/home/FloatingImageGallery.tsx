/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */

'use client'

import Image from 'next/image'
import {
  useRef,
  MouseEvent,
  useEffect,
  useState,
} from 'react'
import { motion, useAnimation } from 'framer-motion'

import type { HomepageImage } from '@/types'

interface FloatingImageGalleryProps {
  children: JSX.Element;
  photoMain: HomepageImage[]
}

export default function FloatingImageGallery({ children, photoMain }: FloatingImageGalleryProps) {
  const [startAnimation, setStartAnimation] = useState(false)
  const planes = [
    { type: 'plane1', ref: useRef(null), control: useAnimation() },
    { type: 'plane2', ref: useRef(null), control: useAnimation() },
    { type: 'plane3', ref: useRef(null), control: useAnimation() },
  ]

  const initial = { x: 0, y: 0 }
  let xForce = 0
  let yForce = 0
  const easing = 0.1 // Reduced easing for smoother motion

  const animate = () => {
    planes.forEach(({ type, control }) => {
      let multiplier
      if (type === 'plane1') {
        multiplier = 1
      } else if (type === 'plane2') {
        multiplier = 0.5
      } else {
        multiplier = 0.25
      }
      control.start({
        x: xForce * multiplier,
        y: yForce * multiplier,
        transition: { type: 'spring', stiffness: 50, damping: 30 },
      })
    })
  }

  const manageMouseMove = (e: MouseEvent<HTMLElement>) => {
    const { movementX, movementY } = e
    xForce += movementX * easing
    yForce += movementY * easing

    requestAnimationFrame(animate)
  }

  useEffect(() => {
    animate()
    const timeoutId = setTimeout(() => setStartAnimation(true), 2000)
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div onMouseMove={manageMouseMove} className="hidden lg:block relative h-screen w-screen overflow-hidden">
      {planes.map(({ type, ref, control }) => (
        <motion.div
          key={type}
          ref={ref}
          initial={initial}
          animate={control}
          className="absolute w-full h-[75vh]"
        >
          {startAnimation && photoMain
            ?.filter((image) => image.type === type)
            .map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: index * 1,
                  duration: 1.5,
                  ease: [0, 0.71, 0.2, 1.01],
                  scale: {
                    type: 'spring',
                    damping: 5,
                    stiffness: 100,
                    restDelta: 0.01,
                  },
                }}
                style={{
                  position: 'absolute',
                  left: `${image.style.left}`,
                  top: `${image.style.top}`,
                  width: `${image.width}px`,
                  height: 'auto', // Allow height to adjust automatically
                }}
              >
                <Image
                  src={image.src}
                  alt={`Image ${image.id}`}
                  width={image.width}
                  height={0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                  className="shadow-lg"
                />
              </motion.div>
            ))}
        </motion.div>
      ))}
      {children}
    </div>
  )
}
