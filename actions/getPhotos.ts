/* eslint-disable no-console */
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Database } from '@/types_db'

export default async function getPhotos(limit = 0) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data, error } = await supabase
    .from('photos')
    .select('*')
    .limit(limit)
  if (error) {
    console.log(error.message)
  }
  return data
}
