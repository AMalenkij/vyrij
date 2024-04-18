import { type CustomMajorEvents } from '@/types'
import getMajorEvent from '@/actions/getMajorEvent'
import processingMajorEvent from '@/utils/processingMajorEvent'

import Timeline from './timeline'

export default async function TimeLine() {
  const data = await getMajorEvent()
  const majorEvent: CustomMajorEvents[] = data ? processingMajorEvent(data) : []
  return majorEvent ? <Timeline majorEvent={majorEvent} /> : null
}
