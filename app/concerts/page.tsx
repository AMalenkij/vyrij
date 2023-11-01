import getConcerts from '@/actions/getConcerts'
import ConcertCard from '@/components/ConcertCard'
import splitTimestamp from '@/utils/splitTimestamp'

export default async function Concerts() {
  const concertsData = await getConcerts()
  return (
    <div className="container mx-auto h-screen justify-center mt-10 flex-col relative">
      {concertsData.map((concert) => (
        <ConcertCard
          key={concert.id}
          timestamptz={splitTimestamp(concert.time)}
          title={concert.title}
          location={concert.location}
          link={concert.link}
          place={concert.map_link}
        />
      ))}
    </div>
  )
}
