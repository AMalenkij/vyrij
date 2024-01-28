/* eslint-disable max-len */
/* eslint-disable no-console */
import { MajorEvent, MinorEvent } from '@/types'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function getEvents():Promise<(MajorEvent | MinorEvent)[]> {
  const supabase = createServerComponentClient({
    cookies,
  })
  try {
    const { data: majorEvent, error: errorMajorEvent } = await supabase
      .from('major_event')
      .select(`
      minor_event(title, date, photos(href))
      `)
      .order('minor_event(date)', { ascending: true }) // Order by date in ascending order (oldest first)

    const { data: minorEvent, error: errorMinorEvent } = await supabase
      .from('minor_event')
      .select(`
        event_id,
        title,
        description,
        date,
        photos(href),
        photos_event(photo_number)
      `)
      .order('date', { ascending: true }) // Order by date in ascending order (oldest first)

    if (errorMajorEvent) {
      console.error('Error fetching data:', (errorMajorEvent as unknown as Error).message)
      return []
    }
    if (errorMinorEvent) {
      console.error('Error fetching data:', (errorMinorEvent as unknown as Error).message)
      return []
    }

    let commonIdCounter = 0
    const updatedJoinMassive: (MajorEvent | MinorEvent)[] = []
    majorEvent?.forEach((element) => {
      updatedJoinMassive.push({ major_events: { ...element.minor_event, event: 'Major', id: commonIdCounter += 1 } })
      const years = minorEvent.find((secondElement) => secondElement.date.slice(0, 4) === element.minor_event.date.slice(0, 4))
      if (years) {
        updatedJoinMassive.push({ ...years, event: 'Minor', id: commonIdCounter += 1 })
      }
    })
    return updatedJoinMassive
  } catch (error) {
    console.error('Unexpected error:', (error as Error).message)
    return []
  }
}
