/* eslint-disable no-console */
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { supabaseStorageURL } from '@/constants/settings'
import { Database } from '@/types_db'
import { HomepageImages } from '@/types'

export default async function getPhotosMain(): Promise<HomepageImages[]> {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data, error } = await supabase
    .from('photos_main')
    .select('photo_main_id, type, positon_top, positon_left, width, photos(href)')
    .order('photo_main_id', { ascending: true }) // Added sorting order
  if (error) {
    console.log(error.message)
    return []
  }
  const updatedJoinMassive: HomepageImages[] = data.map((element) => ({
    id: element.photo_main_id,
    width: element.width,
    type: element.type,
    src: element.photos ? `${supabaseStorageURL}${element.photos.href}` : null,
    style: {
      position: 'absolute',
      left: `${element.positon_left}%`,
      top: `${element.positon_top}%`,
    },
  }))

  return updatedJoinMassive
}
