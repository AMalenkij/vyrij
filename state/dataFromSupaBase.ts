import { create } from 'zustand'

import getEvents from '@/actions/getEvents'

export const useStore = create(async (set) => {
  try {
    const [ ...data ] = await getEvents()
    set({ dataSupabase: data })
  } catch (error) {
    console.error('Error fetching events:', error.message)
  }
})
