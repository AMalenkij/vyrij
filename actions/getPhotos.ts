import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Photos } from '@/types'

const getPhotos = async (limit: number | null = null): Promise<Photos []> => {
  const supabase = createServerComponentClient({
    cookies,
  })

  const { data, error } = await supabase
    .from('photos')
    .select('*')
    .limit(limit)
  if (error) {
    console.log(error.message)
  }

  return (data as any) || []
}

export default getPhotos
