import React, { forwardRef } from 'react'
import { ChorusChronicles as ChorusChroniclesProps } from '@/types'
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
    return (
      <div ref={ref} className="flex flex-col gap-12 bg-yellow-600">
        <h2>{date}</h2>
        <h1>{title}</h1>
        <div className="mt-10">
        {RenderPhotos({ photos, limit: 1, className: 'w-full' })}
        </div>
      </div>
    )
  },
)

export default MajorCard
