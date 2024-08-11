/* eslint-disable max-len */
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import type { MajorEvents, Events, Media } from '@/types/supabase'
import type { CombinedEventData } from '@/types/modifiedDataFromSupabase'

import { combineEventData, getMajorEventYears } from '@/utils/combineEventData'
import getData from '@/actions/getData'
import Chain from '@/public/svg/Chain'
import { TIMELINE_ROUTE } from '@/constants/settings'
import LenisProvider from '@/providers/LenisProvider'
import Footer from '@/components/Footer'
import MajorCard from './MajorCard'
import MinorCard from './MinorCard'
import AnimatedContainer from './WithViewportAnimation'
import Scrollbar from './Scrollbar'

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
  const MajorEventYears = getMajorEventYears(majorEvents as MajorEvents[])
  return (
    <>
      <LenisProvider>
        {dataEvents?.map((item) => (
          <section key={`major-${item.year}`}>
            <MajorCard year={item.year} title={item.title}>
              <Image
                alt={`photo ${item.title}`}
                fill
                src={item.photos}
                className="object-cover brightness-75 contrast-125"
              />
            </MajorCard>
            {item?.eventsWithMedia?.map((elm) => (
              <AnimatedContainer key={`minor-${item.year}${elm.month}${elm.day}`}>
                <MinorCard eventsWithMedia={elm} />
              </AnimatedContainer>
            ))}
          </section>
        ))}
      </LenisProvider>

      <Suspense>
        <nav className="fixed 2xl:left-20 hidden 2xl:flex top-1/3 flex-col mix-blend-difference text-static_white">
          <Link href={TIMELINE_ROUTE} className="transition-color duration-500 hover:text-accent py-6">
            <Chain />
          </Link>
          <Scrollbar MajorEventYears={MajorEventYears} />
        </nav>
      </Suspense>
      <Footer />
    </>
  )
}
