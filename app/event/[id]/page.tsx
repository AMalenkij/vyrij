import { useStore } from '@/state/allData'
import { GroupedEvent } from '@/types'
import MinorCard from '../MinorCard'
import MajorCard from '../MajorCard'

export default function Event() {
  const { allEvent }: { allEvent: GroupedEvent[] } = useStore.getState()
  return (
    <section>
      {allEvent?.map((item) => (
        <div key={item.date}>
          <MajorCard majorEvent={item} />
          {item?.minorEvents?.map((elm) => (
            <MinorCard minorEvent={elm} />
          ))}
        </div>
      ))}
    </section>
  )
}
