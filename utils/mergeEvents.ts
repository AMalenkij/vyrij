import {
  MajorEvent, MinorEvent, GroupedEvent, MinorEventGroup,
} from '@/types'

export default function mergeEvents(
  majorEvent: MajorEvent[],
  minorEvent: MinorEvent[],
): GroupedEvent[] {
  const groupedEvents: Record<string, MinorEventGroup[]> = {}
  minorEvent.forEach((event) => {
    const year = event.date.slice(0, 4)
    const monthDay = event.date.slice(5)
    const formattedDate = `${monthDay}`
    if (!groupedEvents[year]) {
      groupedEvents[year] = []
    }
    groupedEvents[year].push({
      description: event.description,
      date: formattedDate,
      photos: event.photos,
      photos_event: event.photos_event,
    })
  })

  const mergedEvents: GroupedEvent[] = majorEvent.map((element) => {
    const year = element.minor_event.date.slice(0, 4)
    return {
      date: element.minor_event.date,
      title: element.minor_event.title,
      photos: element.minor_event.photos,
      minorEvents: groupedEvents[year] || [],
    }
  })

  return mergedEvents || []
}
