import getConcerts from '@/actions/getConcerts'
import ConcertCard from '@/components/ConcertCard'
import splitTimestamp from '@/utils/splitTimestamp'

import { Concerts as ConcertsT } from '@/types/supabase'

export default async function Concerts() {
  const concertsData: ConcertsT[] | null = await getConcerts()

  return (
    <div className="container mx-auto h-screen justify-center mt-24 flex-col relative">
      {concertsData?.map((concert) => (
        <ConcertCard
          key={concert.id}
          timestamptz={splitTimestamp(concert.time)}
          title={concert.title}
          location={concert.location}
          link={concert.link}
          place={concert.place}
        />
      ))}
    </div>
  )
}
