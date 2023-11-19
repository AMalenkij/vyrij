'use client'

import InfiniteScroll from 'react-infinite-scroll-component'
import getChorusChronicles from '@/actions/getChorusChronicles'
import { ChorusChronicles as ChorusChroniclesProps } from '@/types'
import RenderPhotos from './RenderPhotos'

function ChorusChronicles() {
  const { chronicles, loadMore, hasMoreData } = getChorusChronicles<ChorusChroniclesProps[]>()

  const photoEventCounts = chronicles.map((event) => ({
    event_id: event.event_id,
    count: event.photos_event?.length || 0,
  })) || []

  return (
    <InfiniteScroll
      dataLength={chronicles.length}
      next={loadMore}
      hasMore={hasMoreData}
      loader={<h4>Loading...</h4>}
    >
      <main className="container mx-auto">
        <h1>ChorusChronicles</h1>
        {chronicles.map(({
          event_id,
          date,
          title,
          description,
          photos,
        }) => (
          <div key={event_id}>
            <div>
              <h2>{date}</h2>
              <h1>{title}</h1>
              <h2>{description}</h2>
            </div>

            {photoEventCounts.find((item) => item.event_id === event_id)?.count === 1 && (
              <div className="mt-10">
                {RenderPhotos({ photos, className: 'w-full' })}
              </div>
            )}
            {photoEventCounts.find((item) => item.event_id === event_id)?.count === 2 && (
              <div className="mt-10 flex">
                {RenderPhotos({ photos, limit: 1, className: '-ml-20' })}
                {RenderPhotos({ photos, startFromIndex: 1 })}
              </div>
            )}
            {photoEventCounts.find((item) => item.event_id === event_id)?.count === 3 && (
              <div className="mt-10 flex">
                <div className="flex-col">
                  {RenderPhotos({ photos, limit: 1, className: '-ml-20' })}
                  {RenderPhotos({ photos, startFromIndex: 1, limit: 1 })}
                </div>
                {RenderPhotos({ photos, startFromIndex: 2 })}
              </div>
            )}
            {photoEventCounts.find((item) => item.event_id === event_id)?.count === 4 && (
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
        ))}
      </main>
    </InfiniteScroll>
  )
}

export default ChorusChronicles
