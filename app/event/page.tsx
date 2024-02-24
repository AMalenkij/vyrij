import { useStore } from '@/state/allData'
import { CustomMajorEvents, ModifiedMajorEvents } from '@/types'

import MinorCard from './MinorCard'
import MajorCard from './MajorCard'
// import SideMenu from './SideMenu'

export default function Event() {
  const { allEvent, majorEvent } : { allEvent: ModifiedMajorEvents[], majorEvent: CustomMajorEvents[] } = useStore.getState()

  return (
    <>
      {/* <SideMenu majorEvent={majorEvent} /> */}
      {allEvent?.map((item) => (
        <section key={item.year} className="2xl:mb-44 xl:mb-40 lg:mb-32 md:mb-28 mb-24">
          <MajorCard majorEvents={item} />
          {item?.minorEvents?.map((elm) => (
            <MinorCard minorEvents={elm} />
          ))}
        </section>
      ))}
    </>
  )
}
