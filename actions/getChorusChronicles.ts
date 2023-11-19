import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { ChorusChronicles } from '@/types'

const pageSize = 2

const supabase = createClientComponentClient()

const getChorusChronicles = async (page:number): Promise<ChorusChronicles[]> => {
  try {
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
      .range(page, page + pageSize - 1)

    if (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data:', (error as unknown as Error).message)
      return []
    }

    return data as ChorusChronicles[]
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unexpected error:', (error as Error).message)
    return []
  }
}

export default function useChorusChronicles() {
  const [dataSupabase, setDataSupabase] = useState<ChorusChronicles[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMoreData, setHasMoreData] = useState(true)
  const [chronicles, setChronicles] = useState<ChorusChronicles[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getChorusChronicles(page)
        if (newData.length < pageSize) {
          setHasMoreData(false)
        }

        setDataSupabase((prevData) => [...prevData, ...newData])
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching data:', (error as Error).message)
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData()
  }, [page])

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {
    const newData = dataSupabase.filter((newItem) => !chronicles.some((oldItem) => oldItem.event_id === newItem.event_id))
    if (newData.length > 0) {
      setChronicles((prevChronicles) => [...prevChronicles, ...newData])
    }
  }, [chronicles, dataSupabase])

  return { chronicles, loadMore, hasMoreData }
}
