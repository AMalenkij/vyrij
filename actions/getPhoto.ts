/* eslint-disable no-console */
import createClient from '@/utils/supabase/client'

export default async function getPhoto(idPhoto:number) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('photos')
    .select('photo_id, href')
    .eq('photo_id', idPhoto)
  if (error) {
    console.log(error.message)
  }
  return data
}
