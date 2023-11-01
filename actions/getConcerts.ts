import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Concerts } from '@/types'

const getConcerts = async (): Promise<Concerts[]> => {
  const supabase = createServerComponentClient({
    cookies,
  })

  const { data, error } = await supabase
    .from('concerts')
    .select('*')
    .order('time', { ascending: false })

  if (error) {
    console.log(error.message)
  }

  return (data as any) || []
}

export default getConcerts
