import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { supabaseStorageURL } from '@/constants/settings'
import { PhotosMainProps } from '@/types'

export interface ReturnImageTypes {
  id: number;
  width: number;
  type: 'plane1' | 'plane2' | 'plane3';
  src: string;
  style: {
    position: 'absolute';
    left: string;
    top: string;
  };
}

export default async function getPhotosMain(): Promise<ReturnImageTypes[]> {
  const supabase = createServerComponentClient({
    cookies,
  })

  const { data, error } = await supabase
    .from<PhotosMainProps[]>('photos_main')
    .select('photo_main_id, type, positon_top, positon_left, width, photos(href)')
    .order('photo_main_id', { ascending: true }) // Added sorting order
  if (error) {
    console.log(error.message)
    return []
  }
  const updatedJoinMassive: ReturnImageTypes[] = data.map((element) => ({
    id: element.photo_main_id,
    width: element.width,
    type: element.type,
    src: `${supabaseStorageURL}${element.photos.href}`,
    style: {
      position: 'absolute',
      left: `${element.positon_left}%`,
      top: `${element.positon_top}%`,
    },
  }))

  return updatedJoinMassive
}
