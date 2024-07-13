/* eslint-disable max-len */

import { type MajorEvents, Events, Media } from '@/types/supabase'
import { CombinedEventData } from '@/types/modifiedDataFromSupabase'
import { SUPABASE_STORAGE_URL } from '@/constants/settings'

export function getMajorEvents(majorEvents: MajorEvents[], events: Events[], photos: Media[]) {
  return majorEvents.map((mEvent) => {
    const year = parseInt(mEvent.date.slice(0, 4), 10)
    const filteredPhotos = photos
      .filter((photo) => photo.event_id === mEvent.event_id)
      .filter((photo) => photo.display_order === '1')
      .map((photo) => `${SUPABASE_STORAGE_URL}${photo.href}`)

    return {
      year,
      title: mEvent.title,
      photos: filteredPhotos.length > 0 ? filteredPhotos.join(', ') : '',
    }
  })
}

export default function combineEventData(
  majorEvents: MajorEvents[],
  events: Events[],
  photos: Media[],
  videoUrls: Media[],
): CombinedEventData[] {
  const majorEventsWithPhotos = getMajorEvents(majorEvents, events, photos)

  return majorEventsWithPhotos.map((mEvent) => {
    const filteredEvents = events.filter((event) => parseInt(event.date.slice(0, 4), 10) === mEvent.year)

    return {
      year: mEvent.year,
      title: mEvent.title,
      photos: mEvent.photos,
      eventsWithMedia: filteredEvents.map((event) => {
        const eventPhotos = photos
          .filter((photo) => photo.event_id === event.event_id)
          .map((photo) => ({
            href: `${SUPABASE_STORAGE_URL}${photo.href}`,
            display_order: parseInt(photo.display_order, 10),
            type: 'photo' as const, // Explicitly setting type
          }))

        const eventVideos = videoUrls
          .filter((video) => video.event_id === event.event_id)
          .map((video) => ({
            href: video.href,
            display_order: parseInt(video.display_order, 10),
            type: 'video' as const, // Explicitly setting type
          }))

        const media = [...eventPhotos, ...eventVideos].sort((a, b) => a.display_order - b.display_order)

        return {
          month: parseInt(event.date.slice(5, 7), 10),
          day: parseInt(event.date.slice(8), 10),
          description: event.description,
          media,
        }
      }),
    }
  })
}
