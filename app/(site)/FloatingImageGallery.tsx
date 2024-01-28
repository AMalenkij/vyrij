/* eslint-disable @typescript-eslint/no-floating-promises */

'use client'

import Image from 'next/image'
import { useRef, MouseEvent, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

export default function FloatingImageGallery({ data, children }) {
  const planes = [
    { type: 'plane1', ref: useRef(null), control: useAnimation() },
    { type: 'plane2', ref: useRef(null), control: useAnimation() },
    { type: 'plane3', ref: useRef(null), control: useAnimation() },
  ]

  const initial = { x: 0, y: 0 }
  let xForce = 0
  let yForce = 0
  const easing = 0.025 // Adjust the easing value for smoother animation
  const alt = 'image'

  const animate = () => {
    planes.forEach(({ type, control }) => {
      control.start({
        x: xForce * (type === 'plane1' ? 1 : (type === 'plane2' ? 0.5 : 0.25)),
        y: yForce * (type === 'plane1' ? 1 : (type === 'plane2' ? 0.5 : 0.25)),
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

  return (
    <div onMouseMove={manageMouseMove} className="relative w-screen h-screen">
      {planes.map(({ type, ref, control }) => (
        <motion.div
          key={type}
          ref={ref}
          initial={initial}
          animate={control}
          className="absolute w-full h-full"
        >
          {data
            .filter((image) => image.type === type)
            .map((image) => (
              <Image
                key={image.id}
                src={image.src}
                alt={alt}
                width={image.width}
                height={image.width}
                style={image.style}
              />
            ))}
        </motion.div>
      ))}
      {children}
    </div>
  )
}
