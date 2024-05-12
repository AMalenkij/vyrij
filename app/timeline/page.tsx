import { type CustomMajorEvents } from '@/types'
import getMajorEvent from '@/actions/getMajorEvent'
import processingMajorEvent from '@/utils/processingMajorEvent'
import { supabaseStorageURL } from '@/constants/settings'
import WithTimeLineAnimation from './withTimeLineAnimation'
import VerticalTimelineLine from './VerticalTimelineLine'
import Card from './Card'

export default async function TimeLine() {
  const data = await getMajorEvent()
  const majorEvent: CustomMajorEvents[] = data ? processingMajorEvent(data) : []
  return majorEvent ? (
    <WithTimeLineAnimation>
      {majorEvent.map((element) => (
        <div
          className="
              flex-col
              justify-center
              items-center
              mr-32
              "
          key={element.year}
        >
          <Card
            year={element.year}
            description={element.title}
            imageSrc={`${supabaseStorageURL}${element.photos[0].href}`}
          />
          <VerticalTimelineLine year={element.year} />
        </div>
      ))}
    </WithTimeLineAnimation>
  ) : null
}
