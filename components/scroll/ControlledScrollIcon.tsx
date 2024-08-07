'use client'

import { twMerge } from 'tailwind-merge'
import { motion, useScroll } from 'framer-motion'

import { SCROLL } from '@/constants/settings'

export default function ControlledScrollIcon({ scrollCallback, className }
: { scrollCallback?: () => void, className?: string }) {
  const { scrollYProgress } = useScroll()
  if (typeof scrollCallback === 'function') {
    scrollCallback()
  }
  return (
    <div className={twMerge('mouse w-10 mt-4', className)}>
      <div className="frame w-full absolute z-[1]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 54.9 91"
        >
          <path
            d="M27.4,3.6L27.4,3.6C14.2,3.6,3.5,14.3,3.5,27.5v36c0,13.2,10.7,23.9,23.9,23.9h0c13.2,0,23.9-10.7,23.9-23.9v-36C51.4,14.3,40.7,3.6,27.4,3.6z"
            className="fill-none stroke-primary stroke-[3] opacity-50"
          />
        </svg>
      </div>
      <div className="mouse-left stroke-current fill-none stroke-[3] w-1/2 absolute z-[2]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 27.4 91"
        >
          <motion.path
            className="Animate-Draw opacity-50 stroke-[3]"
            d="M27.4,87.5L27.4,87.5c-13.2,0-23.9-10.7-23.9-23.9v-36c0-13.2,10.7-23.9,23.9-23.9h0"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>
      </div>
      <div className="mouse-right stroke-current fill-none stroke-[3] w-1/2 absolute z-[2] right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 27.4 91"
          transform="matrix(1,0,0,-1,0,0)"
        >
          <motion.path
            className="Animate-Draw opacity-50 stroke-[3]"
            d="M0,3.6L0,3.6c13.2,0,23.9,10.7,23.9,23.9v36c0,13.2-10.7,23.9-23.9,23.9h0"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>
      </div>
      <div className="ball absolute w-2 h-2 bg-primary m-auto inset-0 rounded-full" />
      <p className="animate-text text-sm  absolute left-1/2 sm:top-28 top-20 ml-[6px] lg:tracking-[6px] tracking-[4px]">{SCROLL}</p>
    </div>
  )
}
