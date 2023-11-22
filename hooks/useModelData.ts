import { useEffect, useState } from 'react'

interface ModelDataItem {
  event_id: string;
}

export default function useModelData<T extends ModelDataItem>(
  getModelData: (page: number) => Promise<T[]>,
  pageSize: number,
) {
  const [dataSupabase, setDataSupabase] = useState<T[]>([])
  const [page, setPage] = useState(1)
  const [hasMoreData, setHasMoreData] = useState(true)
  const [modelData, setModelData] = useState<T[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getModelData(page)
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {
    const newData = dataSupabase.filter((newItem) => !modelData.some((oldItem) => oldItem.event_id === newItem.event_id))
    if (newData.length > 0) {
      setModelData((prevChronicles) => [...prevChronicles, ...newData])
    }
  }, [modelData, dataSupabase])

  return { modelData, loadMore, hasMoreData }
}
