/* eslint-disable no-console */
import createClient from '@/utils/supabase/client'

export default async function getPhotosMain() {
  const supabase = createClient()
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
