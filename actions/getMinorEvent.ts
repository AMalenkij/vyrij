/* eslint-disable no-console */
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Database } from '@/types_db'

export default async function getMinorEvent() {
  const supabase = createServerComponentClient<Database>({ cookies })
  try {
    const { data, error } = await supabase
      .from('minor_event')
      .select(`
        description,
        date,
        photos(href),
        photos_event(photo_number)
      `)
      .order('date', { ascending: true }) // Order by date in ascending order (oldest first)
    if (error) {
      console.error('Error fetching Major Events:', (error as unknown as Error).message)
      return []
    }
    return data || []
  } catch (error) {
    console.error('Unexpected error:', (error as Error).message)
    return []
  }
}
