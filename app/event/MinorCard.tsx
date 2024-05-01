/* eslint-disable @typescript-eslint/naming-convention */
import { ModifiedMinorEvents } from '@/types'
import getMonthNameUkr from '@/utils/getMonthNameUkr'
import RenderPhotos from './RenderPhotos'

export default function MinorCard({ minorEvents }:{ minorEvents:ModifiedMinorEvents }) {
  const {
    month,
    day,
    description,
    photos,
    photos_event,
  } = minorEvents

  const photoEventCounts = photos_event?.length || 0

  return (
    <div className="container mx-auto flex flex-col">
      <div>
        <h2 className="mt-24 text-2xl ">
          {day}
          {' '}
          {getMonthNameUkr(month)}
        </h2>
        <h2 className="py-6 text-lg">{description}</h2>
      </div>

      {photoEventCounts === 1 && (
      <div className="w-full">
        {RenderPhotos({ photos, className: '' })}
      </div>
      )}
      {photoEventCounts === 2 && (
      <div className="flex gap-6">
        {RenderPhotos({ photos, limit: 1, className: 'w-1/2' })}
        {RenderPhotos({ photos, startFromIndex: 1, className: 'w-1/2' })}
      </div>
      )}
      {photoEventCounts === 3 && (
      <div className="flex gap-x-6">
        <div className="flex-col">
          {RenderPhotos({ photos, limit: 1, className: '-ml-20 pb-10 h-1/2' })}
          {RenderPhotos({
            photos, startFromIndex: 1, limit: 1, className: 'h-1/2',
          })}
        </div>
        {RenderPhotos({ photos, startFromIndex: 2, className: '' })}
      </div>
      )}
      {photoEventCounts === 4 && (
      <div className="mt-10 flex gap-6">
        <div className="flex-col">
          {RenderPhotos({ photos, limit: 1, className: 'xl:-ml-20 -ml-4' })}
          {RenderPhotos({
            photos, startFromIndex: 1, limit: 1, className: 'pt-10',
          })}
        </div>
        <div className="flex-col">
          {RenderPhotos({
            photos, startFromIndex: 2, limit: 2, className: 'pb-10',
          })}
        </div>
      </div>
      )}
    </div>
  )
}
