/* eslint-disable @typescript-eslint/no-floating-promises */

'use client'

import Image from 'next/image'
import { useRef, MouseEvent } from 'react'
import { motion, useAnimation } from 'framer-motion'

import floating1 from '@/public/images/floating_1.jpg'
import floating2 from '@/public/images/floating_2.jpg'
import floating3 from '@/public/images/floating_3.jpg'
import floating4 from '@/public/images/floating_4.jpg'
import floating5 from '@/public/images/floating_5.jpg'
import floating6 from '@/public/images/floating_6.jpg'
import floating7 from '@/public/images/floating_7.jpg'
import floating8 from '@/public/images/floating_8.jpg'

export default function FloatingImageGallery() {
  const plane1 = useRef(null)
  const plane2 = useRef(null)
  const plane3 = useRef(null)
  const controls1 = useAnimation()
  const controls2 = useAnimation()
  const controls3 = useAnimation()
  let xForce = 0
  let yForce = 0
  const easing = 0.025 // Adjust the easing value for smoother animation

  const animate = () => {
    controls1.start({
      x: xForce,
      y: yForce,
    })

    controls2.start({
      x: xForce * 0.5,
      y: yForce * 0.5,
    })

    controls3.start({
      x: xForce * 0.25,
      y: yForce * 0.25,
    })
  }

  const manageMouseMove = (e: MouseEvent<HTMLElement>) => {
    const { movementX, movementY } = e
    xForce += movementX * easing
    yForce += movementY * easing

    // Request an animation frame to smooth out the animation
    requestAnimationFrame(animate)
  }

  return (
    <div onMouseMove={(e) => manageMouseMove(e)} className="">
      <motion.div ref={plane1} initial={{ x: 0, y: 0 }} animate={controls1} className="absolute w-full h-full">
        <Image src={floating1} alt="image" width={300} className="absolute left-[90%] top-[70%]" />
        <Image src={floating2} alt="image" width={300} className="absolute left-[5%] top-[65%]" />
        <Image src={floating7} alt="image" width={225} className="absolute left-[35%] top-[0%]" />
      </motion.div>
      <motion.div ref={plane2} initial={{ x: 0, y: 0 }} animate={controls2} className="absolute w-full h-full">
        <Image src={floating4} alt="image" width={250} className="absolute left-[5%] top-[10%]" />
        <Image src={floating6} alt="image" width={200} className="absolute left-[80%] top-[5%]" />
        <Image src={floating8} alt="image" width={225} className="absolute left-[60%] top-[60%]" />
      </motion.div>
      <motion.div ref={plane3} initial={{ x: 0, y: 0 }} animate={controls3} className="absolute w-full h-full">
        <Image src={floating3} alt="image" width={150} className="absolute left-[65%] top-[2.5%]" />
        <Image src={floating5} alt="image" width={200} className="absolute left-[40%] top-[75%]" />
      </motion.div>
    </div>
  )
}
