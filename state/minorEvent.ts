import { create } from 'zustand'

import getMinorEvent from '@/actions/getMinorEvent'

export const useStore = create(async (set) => {
  const data = await getMinorEvent()
  set({ minorEvent: data })
})

export default useStore
