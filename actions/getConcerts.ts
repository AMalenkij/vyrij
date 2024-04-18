/* eslint-disable no-console */
import createClient from '@/utils/supabase/client'

export default async function getConcerts() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('concerts')
    .select('*')
    .order('time', { ascending: false })

  if (error) {
    console.log(error.message)
  }

  return data
}
