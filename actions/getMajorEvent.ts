/* eslint-disable no-console */

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Database } from '@/types_db'

export default async function getMajorEvent() {
  const supabase = createServerComponentClient<Database>({ cookies })

  try {
    const { data, error } = await supabase
      .from('major_event')
      .select('minor_event(title, date, photos(href))')
      .order('minor_event(date)', { ascending: true }) // Order by date in ascending order (oldest first)

    if (error) {
      console.error('Error fetching MajorEvent:', (error as unknown as Error).message)
      return []
    }
    return data
  } catch (error) {
    console.error('Unexpected error:', (error as Error).message)
    return []
  }
}
