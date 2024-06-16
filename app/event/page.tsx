/* eslint-disable max-len */
import Image from 'next/image'

import { type MajorEvents, Events, Media } from '@/types/supabase'
import { type CombinedEventData } from '@/types/modifiedDataFromSupabase'

import combineEventData from '@/utils/combineEventData'
import getData from '@/actions/getData'
import MajorCard from './MajorCard'
import MinorCard from './MinorCard'
import AnimatedContainer from './WithViewportAnimation'

export default async function Event() {
  const [majorEvents, events, photos, videoUrls] = await Promise.all([
    getData(
      'events',
      ['event_id', 'date', 'title'],
      [{
        column: 'event_type',
        value: 'major',
        operator: 'eq',
      }],
      { column: 'date', ascending: true },
    ),
    getData('events', ['event_id', 'date', 'description']),
    getData('photos', ['event_id', 'href', 'display_order']),
    getData('video_urls', ['event_id', 'href', 'display_order']),
  ])

  if (!majorEvents.length || !events.length || !photos.length || !videoUrls.length) return null

  // Combine data
  const dataEvents: CombinedEventData[] = combineEventData(
    majorEvents as unknown as MajorEvents[],
    events as unknown as Events[],
    photos as unknown as Media[],
    videoUrls as unknown as Media[],
  )
  // console.log(dataEvents)
  return (
    <div className="-mt-40">
      {dataEvents?.map((item) => (
        <section key={item.year} className="2xl:mb-44 xl:mb-40 lg:mb-32 md:mb-28 mb-24">
          <MajorCard year={item.year} title={item.title}>
            <Image
              key={item.photos ? item.photos : ''}
              width={1000}
              height={1000}
              loading="lazy" // Lazy loading
              alt="chor"
              src={item.photos ? item.photos : ''}
              className="object-cover min-w-full max-w-full h-screen relative"
            />
          </MajorCard>
          {item?.eventsWithMedia?.map((elm) => (
            <AnimatedContainer key={elm.day + elm.month}>
              <MinorCard eventsWithMedia={elm} />
            </AnimatedContainer>
          ))}
        </section>
      ))}
    </div>
  )
}
