import { type MajorEvents, Media, Events } from '@/types/supabase'
import getData from '@/actions/getData'
import { getMajorEvents } from '@/utils/combineEventData'
import WithTimeLineAnimation from './withTimeLineAnimation'
import VerticalTimelineLine from './VerticalTimelineLine'
import Card from './Card'

export default async function TimeLine() {
  const [majorEvents, events, photos] = await Promise.all([
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
  ])
  if (!majorEvents.length || !events.length || !photos.length) return []

  const data = getMajorEvents(
    majorEvents as unknown as MajorEvents[],
    events as unknown as Events[],
    photos as unknown as Media[],
  )
  return data ? (
    <WithTimeLineAnimation>
      {data.map((element) => (
        <div
          className="
              flex-col
              justify-center
              items-center
              mr-32"
          key={element.year}
        >
          <Card
            year={element.year}
            description={element.title}
            imageSrc={element.photos}
          />
          <VerticalTimelineLine year={element.year} />
        </div>
      ))}
    </WithTimeLineAnimation>
  ) : null
}
