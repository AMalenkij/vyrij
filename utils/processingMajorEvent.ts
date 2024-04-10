import { CustomMajorEvents } from '@/types'
import { MajorEvents } from '@/types/supabase'

export default function processingMajorEvent(majorEvents: MajorEvents[]): CustomMajorEvents[] {
  return majorEvents.map((element) => ({
    year: element.minor_event ? parseInt(element.minor_event.date.slice(0, 4), 10) : 0,
    title: element.minor_event ? element.minor_event.title : '',
    photos: element.minor_event ? element.minor_event.photos : [],
  }))
}
