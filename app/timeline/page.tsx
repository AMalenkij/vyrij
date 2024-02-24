import { useStore } from '@/state/allData'
import { MinorEventTL } from '@/types'
import Timeline from './timeline'

export default function TimeLine() {
  const { majorEvent } = useStore.getState() as { majorEvent: MinorEventTL[] }
  // return <Timeline majorEvent={majorEvent} />
}
