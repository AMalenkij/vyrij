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
  const easing = 0.009 // Adjust the easing value for smoother animation

  const animate = () => {
    planes.forEach(({ type, control }) => {
      let xMultiplier; let
        yMultiplier

      if (type === 'plane1') {
        xMultiplier = 1
        yMultiplier = 1
      } else if (type === 'plane2') {
        xMultiplier = 0.5
        yMultiplier = 0.5
      } else {
        xMultiplier = 0.25
        yMultiplier = 0.25
      }

      control.start({
        x: xForce * xMultiplier,
        y: yForce * yMultiplier,
      })
    })
  }

  const manageMouseMove = (e: MouseEvent<HTMLElement>) => {
    const { movementX, movementY } = e
    xForce += movementX * easing
    yForce += movementY * easing

    // Request an animation frame to smooth out the animation
    requestAnimationFrame(animate)
  }

  useEffect(() => {
    // Initialize animation on mount
    animate()
  }, [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setStartAnimation(true)
    }, 2000)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div onMouseMove={manageMouseMove} className="hidden lg:block relative h-screen w-screen">
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
                transition={{ delay: index * 1.5, duration: 5, ease: [0, 0.31, 0.2, 1.01] }}
                className={`w-[${image.width}px] h-[${image.width}px]`}
              >
                <Image
                  src={image.src}
                  alt={`Image ${image.id}`}
                  width={image.width}
                  height={image.width}
                  style={image.style}
                  className="absolute"
                />
              </motion.div>
            ))}
        </motion.div>
      ))}
      {children}
    </div>
  )
}
