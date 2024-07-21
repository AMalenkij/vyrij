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
    majorEvents as MajorEvents[],
    events as Events[],
    photos as Media[],
    videoUrls as Media[],
  )

  return (
    <div className="">
      {dataEvents?.map((item) => (
        <section key={item.year} className="mb-20">
          <MajorCard year={item.year} title={item.title}>
            <Image
              key={item.photos}
              priority={false}
              alt="chor"
              fill
              src={item.photos ? item.photos : ''}
              className="w-full h-full absolute inset-0 object-cover"
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
