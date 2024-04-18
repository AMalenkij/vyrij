/* eslint-disable no-console */
import createClient from '@/utils/supabase/client'

export default async function getPhotos(limit = 0) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('photos')
    .select('*')
    .limit(limit)
  if (error) {
    console.log(error.message)
  }
  return data
}
