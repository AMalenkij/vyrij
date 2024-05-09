import { type CustomMajorEvents } from '@/types'
import getMajorEvent from '@/actions/getMajorEvent'
import processingMajorEvent from '@/utils/processingMajorEvent'
import Timeline from './timeline'

export default async function TimeLine() {
  const data = await getMajorEvent()
  const majorEvent: CustomMajorEvents[] = data ? processingMajorEvent(data) : []
  return majorEvent ? (
    <Timeline majorEvent={majorEvent}>
      <div className="
        absolute
        inset-0
        bottom-auto
        text-center
        pointer-events-none
        mt-12
        md:mt-28"
      >
        <h2 className="
          text-2xl
          md:text-3xl
          md:mt-100
          my-10
          md:my-65"
        >
          Choose a year
        </h2>
      </div>
    </Timeline>
  ) : null
}
