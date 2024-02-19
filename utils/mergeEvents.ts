import {
  MajorEvent, MinorEvent, GroupedEvent, MinorEventGroup,
} from '@/types'

export default function mergeEvents(
  majorEvent: MajorEvent[],
  minorEvent: MinorEvent[],
): GroupedEvent[] {
  const groupedEvents: Record<string, MinorEventGroup[]> = {}
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

  const mergedEvents: GroupedEvent[] = majorEvent.map((element) => {
    const year = element.minor_event.date.slice(0, 4)
    return {
      year: parseInt(year, 10),
      title: element.minor_event.title,
      photos: element.minor_event.photos,
      minorEvents: groupedEvents[year],
    }
  })

  return mergedEvents || []
}
