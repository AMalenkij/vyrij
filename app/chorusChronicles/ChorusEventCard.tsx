import React, { forwardRef } from 'react'
import { ChorusChronicles as ChorusChroniclesProps } from '@/types'
import RenderPhotos from './RenderPhotos'

interface ChorusEventCardProps {
  event: ChorusChroniclesProps;
}

const ChorusEventCard = forwardRef<HTMLDivElement, ChorusEventCardProps>(
  ({ event }: ChorusEventCardProps, ref) => {
    const {
      event_id,
      date,
      title,
      description,
      photos,
    } = event

    const photoEventCounts = event.photos_event?.length || 0

    return (
      <div ref={ref} key={event_id} className="flex flex-col gap-12">
        <div>
          <h2>{date}</h2>
          <h1>{title}</h1>
          <h2>{description}</h2>
        </div>

        {photoEventCounts === 1 && (
          <div className="mt-10">
            {RenderPhotos({ photos, className: 'w-full' })}
          </div>
        )}
        {photoEventCounts === 2 && (
          <div className="mt-10 flex">
            {RenderPhotos({ photos, limit: 1, className: '-ml-20' })}
            {RenderPhotos({ photos, startFromIndex: 1 })}
          </div>
        )}
        {photoEventCounts === 3 && (
          <div className="mt-10 flex">
            <div className="flex-col">
              {RenderPhotos({ photos, limit: 1, className: '-ml-20' })}
              {RenderPhotos({ photos, startFromIndex: 1, limit: 1 })}
            </div>
            {RenderPhotos({ photos, startFromIndex: 2 })}
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

export default ChorusEventCard
