import { create } from 'zustand'

import getMajorEvent from '@/actions/getMajorEvent'

export const useStore = create(async (set) => {
  const data = await getMajorEvent()
  set({ majorEvent: data })
})

export default useStore
