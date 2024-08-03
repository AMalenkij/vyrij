/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */

import type { EventWithMedia, EventMedia } from '@/types/modifiedDataFromSupabase'

import getMonthNameUkr from '@/utils/getMonthNameUkr'
import YouTubeVideo from './YouTubeVideo'
import RenderPhoto from './RenderPhoto'

export default function MinorCard({ eventsWithMedia }: { eventsWithMedia: EventWithMedia }) {
  const {
    month, day, description, media = [],
  } = eventsWithMedia
  const renderMedia = (mediaItems: EventMedia[], className?: string) => mediaItems.map((item) => {
    if (item.type === 'photo') return <RenderPhoto key={item.display_order} photoUrl={item.href} className={className} />
    if (item.type === 'video') return <YouTubeVideo key={item.display_order} url={item.href} className={className} />
    return null
  })

  const renderPhotosByCount = (count: number) => {
    switch (count) {
      case 1:
        return <div className="w-full h-1/2">{renderMedia([media[0]])}</div>
      case 2:
        return <div className="flex gap-6">{renderMedia(media.slice(0, 2), 'w-1/2')}</div>
      case 3:
        return (
          <div className="flex gap-x-6">
            <div className="flex-col">
              {renderMedia([media[0]], '-ml-20 pb-10 h-1/2')}
              {renderMedia([media[1]], 'h-1/2')}
            </div>
            {renderMedia([media[2]], 'lg:w-full w-1/2')}
          </div>
        )
      case 4:
        return (
          <div className="mt-10 flex gap-6">
            <div className="flex-col">
              {renderMedia([media[0]], 'xl:-ml-20 -ml-4')}
              {renderMedia([media[1]], 'pt-10')}
            </div>
            <div className="flex-col">
              {renderMedia([media[2]], 'pb-10')}
              {renderMedia([media[3]], 'pb-10')}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto flex flex-col w-full">
      <div>
        <h2 className="mt-20 text-2xl lg:text-3xl ">
          {day}
          {' '}
          {getMonthNameUkr(month)}
        </h2>
        <p className="py-6 text-lg lg:text-xl whitespace-pre-line">{description}</p>
      </div>
      {renderPhotosByCount(media.length)}
    </div>
  )
}
