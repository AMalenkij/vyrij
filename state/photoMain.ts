import { create } from 'zustand'

import getPhotosMain from '@/actions/getPhotosMain'

export const useStore = create(async (set) => {
  try {
    const [ ...data ] = await getPhotosMain()
    set({ photoMain: data })
  } catch (error) {
    console.error('Error fetching main Photos:', error.message)
  }
})
