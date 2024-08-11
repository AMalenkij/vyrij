import ConcertCard from '@/components/ConcertCard'
import splitTimestamp from '@/utils/splitTimestamp'
import { CONCERTS, PAST, FUTURES } from '@/constants/settings'
import getData from '@/actions/getData'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Title from '@/components/Title'
import { type Concerts as ConcertsType } from '@/types/supabase'

export default async function Concerts() {
  const today = new Date().toISOString().split('T')[0] // Get today's date in 'YYYY-MM-DD' format
  const concertsDataFuture:ConcertsType[] = await getData(
    'concerts',
    ['id', 'title', 'time', 'location', 'place'],
    [{
      column: 'time',
      operator: 'gte',
      value: today,
    }],
    { column: 'time', ascending: true },
  )
  const concertsDataPast:ConcertsType[] = await getData(
    'concerts',
    ['title', 'time', 'location', 'place'],
    [{
      column: 'time',
      operator: 'lte',
      value: today,
    }],
    { column: 'time', ascending: true },
  )

  return (
    <div className="container mx-auto">
      <Title>
        {CONCERTS}
      </Title>
      <Accordion
        type="single"
        className="w-full"
        defaultValue="Futures"
        collapsible
      >
        <AccordionItem value="Futures">
          <AccordionTrigger>
            <h3 className="text-xl md:text-2xl">{FUTURES}</h3>
          </AccordionTrigger>
          <AccordionContent>
            {concertsDataFuture?.map((concert) => (
              <ConcertCard
                key={`Future-${concert.id}`}
                timestamptz={splitTimestamp(concert.time)}
                title={concert.title}
                location={concert.location}
                place={concert.place}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="Past">
          <AccordionTrigger>
            <h3 className="text-xl md:text-2xl">{PAST}</h3>
          </AccordionTrigger>
          <AccordionContent>
            {concertsDataPast?.map((concert) => (
              <ConcertCard
                key={`Past-${concert.id}`}
                timestamptz={splitTimestamp(concert.time)}
                title={concert.title}
                location={concert.location}
                place={concert.place}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
