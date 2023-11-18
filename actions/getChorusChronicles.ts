import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { ChorusChronicles } from '@/types'

const getChorusChronicles = async (): Promise<ChorusChronicles[]> => {
  const supabase = createServerComponentClient({
    cookies,
  })

  const { data, error } = await supabase
    .from('chorus_chronicles')
    .select(`
    event_id,
    title,
    description,
    date,
    photos(href),
    photos_event(photo_number)
  `)
  if (error) {
    console.log(error.message)
  }

  return (data as any) || []
}

export default getChorusChronicles
