import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { MajorEvent } from '@/types'

const pageSize = 1

const supabase = createClientComponentClient()

export default async function getMajorEvent(page:number): Promise<MajorEvent[]> {
  try {
    const { data, error } = await supabase
      .from('major_event')
      .select(`
      chorus_chronicles(title, date, photos(href))
      `)
      .range(page, page + pageSize - 1)

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
