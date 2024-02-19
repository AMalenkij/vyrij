import { create } from 'zustand'

import getPhotosMain from '@/actions/getPhotosMain'

export const useStore = create(async (set) => {
  const data = await getPhotosMain()
  set({ photoMain: data })
})

export default useStore
