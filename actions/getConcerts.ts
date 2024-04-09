/* eslint-disable no-console */
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Database } from '@/types_db'

export default async function getConcerts() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data, error } = await supabase
    .from('concerts')
    .select('*')
    .order('time', { ascending: false })

  if (error) {
    console.log(error.message)
  }

  return data
}
