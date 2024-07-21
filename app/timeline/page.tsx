import { type MajorEvents, Media, Events } from '@/types/supabase'
import getData from '@/actions/getData'
import { getMajorEvents } from '@/utils/combineEventData'
import ControlledScrollIcon from '@/components/scroll/ControlledScrollIcon'
import { CHOOSE_A_YEAR } from '@/constants/settings'
import Title from '@/components/Title'
import WithTimeLineAnimation from './withTimeLineAnimation'
import VerticalTimelineLine from './VerticalTimelineLine'
import Card from './Card'
import CardMobile from './CardMobile'

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
    majorEvents as MajorEvents[],
    events as Events[],
    photos as Media[],
  )
  return (
    <WithTimeLineAnimation
      title={(
        <>
          <Title>{CHOOSE_A_YEAR}</Title>
          <ControlledScrollIcon />
        </>
    )}
      timelineContent={
      data.map((element) => (
        <div
          key={element.year}
          className="flex-col justify-center items-center mr-32"
        >
          <CardMobile
            year={element.year}
            description={element.title}
            imageSrc={element.photos}
            className="block lg:hidden"
          />
          <Card
            year={element.year}
            description={element.title}
            imageSrc={element.photos}
            className="hidden lg:block"
          />
          <VerticalTimelineLine year={element.year} />
        </div>
      ))
    }
    />
  )
}
