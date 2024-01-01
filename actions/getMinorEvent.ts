import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { ChorusChronicles } from '@/types'

const supabase = createClientComponentClient()

export default async function getMinorEvent(): Promise<ChorusChronicles[]> {
  try {
    const { data, error } = await supabase
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
    if (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data:', (error as unknown as Error).message)
      return []
    }

    return data as ChorusChronicles[]
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unexpected error:', (error as Error).message)
    return []
  }
}
