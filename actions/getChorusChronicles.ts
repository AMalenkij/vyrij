import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { ChorusChronicles } from '@/types'

const supabase = createClientComponentClient()

export default async function getChorusChronicles(): Promise<ChorusChronicles[]> {
  try {
    const { data, error } = await supabase
      .from('chorus_chronicles')
      .select(`
        event_id,
        title,
        description,
        date,
        photos(href),
        photos_event(photo_number)
      `)
      // .filter('date', 'gte', `${specificYear}-01-01`)
      // .filter('date', 'lt', `${specificYear + 1}-01-01`)
      // .range((page - 1) * pageSize, page * pageSize - 1)
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
