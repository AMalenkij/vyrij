/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

import useMenuOpen from '@/hooks/useMenuOpen'

export default function NavMenuToggle() {
  const { isOpen, onOpen, onClose } = useMenuOpen()

  const path1Controls = useAnimation()
  const path2Controls = useAnimation()

  const path1Variants = {
    open: { d: 'M3.06061 2.99999L21.0606 21' },
    closed: { d: 'M0 8.5L24 8.5' },
  }

  const path2Variants = {
    open: { d: 'M3.00006 21.0607L21 3.06064' },
    closed: { d: 'M0 15.5L24 15.5' },
  }

  useEffect(() => {
    const animatePaths = async () => {
      if (isOpen) {
        await path1Controls.start(path1Variants.open)
        await path2Controls.start(path2Variants.open)
      } else {
        await path1Controls.start(path1Variants.closed)
        await path2Controls.start(path2Variants.closed)
      }
    }
    animatePaths()
  }, [isOpen])

  return (
    <button
      className="fixed left-1/2 -translate-x-1/2 top-12 cursor-pointer stroke-2 z-[100] stroke-white  mix-blend-difference"
      onClick={isOpen ? onClose : onOpen}
      type="button"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <motion.path
          d={path1Variants.closed.d}
          animate={path1Controls}
          transition={{ duration: 0.2 }}
        />
        <motion.path
          d={path2Variants.closed.d}
          animate={path2Controls}
          transition={{ duration: 0.2 }}
        />
      </svg>
    </button>
  )
}
