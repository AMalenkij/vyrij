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

import { Concerts as ConcertsType } from '@/types/supabase'

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
    <div className="container mx-auto h-screen justify-center mt-24 flex-col relative">
      <h2 className="
          text-2xl
          md:text-3xl
          md:mt-100
          my-4
          text-center
          "
      >
        {CONCERTS}
      </h2>
      <Accordion
        type="single"
        className="w-full"
        defaultValue="Futures"
        collapsible
      >
        <AccordionItem value="Futures">
          <AccordionTrigger>
            <h3 className="
          text-2xl
          md:text-3xl
          md:mt-100
          text-center
          "
            >
              {FUTURES}
            </h3>
          </AccordionTrigger>
          <AccordionContent>
            {concertsDataFuture?.map((concert) => (
              <ConcertCard
                key={concert.id}
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
            <h3 className="
          text-2xl
          md:text-3xl
          md:mt-100
          text-center
          "
            >
              {PAST}
            </h3>
          </AccordionTrigger>
          <AccordionContent>
            {concertsDataPast?.map((concert) => (
              <ConcertCard
                key={concert.id}
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
