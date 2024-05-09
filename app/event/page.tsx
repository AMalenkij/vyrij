import { type ModifiedMajorEvents } from '@/types'

import mergeEvents from '@/utils/mergeEvents'
import getMinorEvent from '@/actions/getMinorEvent'
import getMajorEvent from '@/actions/getMajorEvent'
import MajorCard from './MajorCard'
import MinorCard from './MinorCard'
import AnimatedContainer from './WithViewportAnimation'

export default async function Event() {
  const dataMinorEvent = await getMinorEvent()
  const dataMajorEvent = await getMajorEvent()

  const allEvent: ModifiedMajorEvents[] = (dataMinorEvent && dataMajorEvent)
    ? mergeEvents(dataMajorEvent, dataMinorEvent)
    : []
  return (
    <div className="-mt-40">
      {allEvent?.map((item) => (
        <section key={item.year} className="2xl:mb-44 xl:mb-40 lg:mb-32 md:mb-28 mb-24">
          <MajorCard majorEvents={item} />
          {item?.minorEvents?.map((elm) => (
            <AnimatedContainer>
              <MinorCard minorEvents={elm} />
            </AnimatedContainer>
          ))}
        </section>
      ))}
    </div>
  )
}
