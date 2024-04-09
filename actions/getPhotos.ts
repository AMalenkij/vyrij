/* eslint-disable no-console */
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Photos } from '@/types'

const getPhotos = async (limit = 0): Promise<Photos[]> => {
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

  return data as Photos[]
}

export default getPhotos
