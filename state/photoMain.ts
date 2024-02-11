/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { create } from 'zustand'

import getPhotosMain from '@/actions/getPhotosMain'

export const useStore = create(async (set) => {
  try {
    const [...data] = await getPhotosMain()
    set({ photoMain: data })
  } catch (error: any) {
    console.error('Error fetching main Photos:', error.message)
  }
})

export default useStore
