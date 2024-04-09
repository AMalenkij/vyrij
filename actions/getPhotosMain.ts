/* eslint-disable no-console */
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Database } from '@/types_db'

export default async function getPhotosMain() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data, error } = await supabase
    .from('photos_main')
    .select('photo_main_id, type, positon_top, positon_left, width, photos(href)')
    .order('photo_main_id', { ascending: true }) // Added sorting order

  if (error) {
    console.error('Error fetching Photos Main:', (error as unknown as Error).message)
    return []
  }

  return data
}
