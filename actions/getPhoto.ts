import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Photo } from '@/types'

const getPhoto = async (): Promise<Photo []> => {
  const supabase = createServerComponentClient({
    cookies,
  })

  const { data, error } = await supabase
    .from('photo')
    .select('*')
  if (error) {
    console.log(error.message)
  }

  return (data as any) || []
}

export default getPhoto
