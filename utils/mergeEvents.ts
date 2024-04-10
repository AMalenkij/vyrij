import {
  ModifiedMajorEvents,
  ModifiedMinorEvents,
} from '@/types'

import { MajorEvents, MinorEvents } from '@/types/supabase'

export default function mergeEvents(
  majorEvent: MajorEvents[],
  minorEvent: MinorEvents[],
): ModifiedMajorEvents[] {
  const groupedEvents: Record<number, ModifiedMinorEvents[]> = {}
  minorEvent.forEach((event) => {
    const year = parseInt(event.date.slice(0, 4), 10)
    const month = parseInt(event.date.slice(5, 7), 10)
    const day = parseInt(event.date.slice(8), 10)

    if (!groupedEvents[year]) {
      groupedEvents[year] = []
    }
    groupedEvents[year].push({
      description: event.description,
      month,
      day,
      photos: event.photos,
      photos_event: event.photos_event,
    })
  })

  const mergedEvents = majorEvent.map((element) => {
    const year = element.minor_event ? parseInt(element.minor_event.date.slice(0, 4), 10) : 0
    return {
      year,
      title: element.minor_event ? element.minor_event.title : '',
      photos: element.minor_event ? element.minor_event.photos : [],
      minorEvents: groupedEvents[year],
    }
  })
  return mergedEvents
}
