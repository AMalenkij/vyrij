import React, { forwardRef, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import { ChorusChronicles as ChorusChroniclesProps } from '@/types'
import { scale } from '@/constants/anim'
import RenderPhotos from './RenderPhotos'

interface ChorusEventCardProps {
  event: ChorusChroniclesProps;
}

const MajorCard = forwardRef<HTMLDivElement, ChorusEventCardProps>(
  ({ event }: ChorusEventCardProps, ref) => {
    const {
      date,
      title,
      photos,
    } = event

    const refFM = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
      target: refFM,
      offset: ['0', '1'],
    })
    const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 1.25])
    return (
      <motion.div
        className="relative h-[200vh]"
        ref={refFM}
        style={{
          scale: scaleProgress,
        }}
      >
        <div ref={ref} className="sticky top-0 w-full h-screen overflow-hidden">
          {RenderPhotos({ photos, limit: 1, className: 'w-full h-screen relative' })}
          <div className="absolute inset-0 flex justify-center items-center text-white text-2xl font-bold pb-56 md:mb-5">{`${date.substring(0, 4)}р`}</div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-9xl font-comforter">{title}</div>
        </div>
      </motion.div>
    )
  },
)

export default MajorCard
