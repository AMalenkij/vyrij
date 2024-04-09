import { useStore } from '@/state/allData'
import { CustomMajorEvents } from '@/types'
import Timeline from './timeline'

export default function TimeLine() {
  const { majorEvent } = useStore.getState() as { majorEvent: CustomMajorEvents[] }
  return majorEvent ? <Timeline majorEvent={majorEvent} /> : null
}
