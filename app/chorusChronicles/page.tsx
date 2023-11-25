'use client'

import InfiniteScroll from 'react-infinite-scroll-component'

import useModelData from '@/hooks/useModelData'
import getChorusChronicles from '@/actions/getChorusChronicles'
import { ChorusChronicles as ChorusChroniclesProps } from '@/types'
import ChorusEventCard from './ChorusEventCard'

export default function ChorusChronicles() {
  const {
    modelData,
    loadMore,
    hasMoreData,
  } = useModelData<ChorusChroniclesProps>(getChorusChronicles, 2)
  return (
    <InfiniteScroll
      dataLength={modelData.length}
      next={loadMore}
      hasMore={hasMoreData}
      loader={<h4>Loading...</h4>}
      style={{ height: '105vh' }}
    >
      <main className="container mx-auto">
        {modelData.map((event) => (
          <ChorusEventCard key={event.event_id} event={event} />
        ))}
      </main>
    </InfiniteScroll>
  )
}
