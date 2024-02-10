import React, { forwardRef } from 'react'

import { ChorusChronicles as ChorusChroniclesProps } from '@/types'
import RenderPhotos from './RenderPhotos'

interface ChorusEventCardProps {
  event: ChorusChroniclesProps;
}

const MinorCard = forwardRef<HTMLDivElement, ChorusEventCardProps>(
  ({ event }: ChorusEventCardProps, ref) => {
    const {
      date,
      description,
      photos,
    } = event

    const photoEventCounts = event.photos_event?.length || 0

    return (
      <div ref={ref} className="container mx-auto my-72 flex flex-col gap-12">
        <div>
          <h2 className='mt-10 text-2xl '>{date}</h2>
          <h2 className='mt-10 text-lg'>{description}</h2>
        </div>

        {photoEventCounts === 1 && (
          <div className="w-full">
            {RenderPhotos({ photos, className: '' })}
          </div>
        )}
        {photoEventCounts === 2 && (
          <div className="flex">
            {RenderPhotos({ photos, limit: 1, className: '-ml-20' })}
            {RenderPhotos({ photos, startFromIndex: 1 })}
          </div>
        )}
        {photoEventCounts === 3 && (
          <div className="flex">
            <div className="flex-col w-3/4">
              {RenderPhotos({ photos, limit: 1, className: '-ml-20 mb-10 w-full' })}
              {RenderPhotos({ photos, startFromIndex: 1, limit: 1, className: 'w-full' })}
            </div>
            {RenderPhotos({ photos, startFromIndex: 2, className: 'w-1/2 w-full' })}
          </div>
        )}
        {photoEventCounts === 4 && (
          <div className="mt-10 flex">
            <div className="flex-col">
              {RenderPhotos({ photos, limit: 1, className: '-ml-20' })}
              {RenderPhotos({ photos, startFromIndex: 1, limit: 1 })}
            </div>
            <div className="flex-col">
              {RenderPhotos({ photos, startFromIndex: 2, limit: 2 })}
            </div>
          </div>
        )}
      </div>
    )
  },
)

export default MinorCard
