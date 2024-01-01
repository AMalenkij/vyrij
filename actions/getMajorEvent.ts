import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { MajorEvent } from '@/types'

const supabase = createClientComponentClient()

export default async function getMajorEvent(): Promise<MajorEvent[]> {
  try {
    const { data, error } = await supabase
      .from('major_event')
      .select(`
      minor_event(title, date, photos(href))
      `)
      .order('minor_event(date)', { ascending: true }) // Order by date in ascending order (oldest first)

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data:', (error as unknown as Error).message)
      return []
    }
    // console.log(data)
    return data as unknown as MajorEvent[]
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unexpected error:', (error as Error).message)
    return []
  }
}
