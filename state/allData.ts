import { create } from 'zustand'

import mapDataToHomepageImages from '@/utils/mapDataToHomepageImages'
import mergeEvents from '@/utils/mergeEvents'
import processingMajorEvent from '@/utils/processingMajorEvent'
import getMinorEvent from '@/actions/getMinorEvent'
import getMajorEvent from '@/actions/getMajorEvent'
import getPhotosMain from '@/actions/getPhotosMain'

export const useStore = create(async (set) => {
  const minorEvent = await getMinorEvent()
  const majorEvent = await getMajorEvent()
  const photoMain = await getPhotosMain()

  set({
    allEvent: mergeEvents(majorEvent, minorEvent),
    majorEvent: processingMajorEvent(majorEvent),
    photoMain: mapDataToHomepageImages(photoMain),
  })
})

export default useStore
