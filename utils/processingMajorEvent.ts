import { MajorEvents, CustomMajorEvents } from '@/types'

export default function processingMajorEvent(majorEvents: MajorEvents[]): CustomMajorEvents[] {
  return majorEvents.map((element) => ({
    year: parseInt(element.minor_event.date.slice(0, 4), 10),
    title: element.minor_event.title,
    photos: element.minor_event.photos,
  }))
}
