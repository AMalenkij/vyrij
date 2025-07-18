import ConcertCard from "@/components/ConcertCard";
import PageHeader from "@/components/PageHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { sanityFetch } from "@/sanity/lib/live";
import {
  futureEventsCountQuery,
  futureEventsQuery,
  pastEventsCountQuery,
  pastEventsQuery,
} from "@/sanity/lib/queries";

export default async function Concerts() {
  const [futureData, pastData, futureCount, pastCount] = await Promise.all([
    sanityFetch({ query: futureEventsQuery }),
    sanityFetch({ query: pastEventsQuery }),
    sanityFetch({ query: futureEventsCountQuery }),
    sanityFetch({ query: pastEventsCountQuery }),
  ]);

  return (
    <>
      <div className="container">
        <PageHeader>{"Concerts"}</PageHeader>
        <Accordion
          type="single"
          className="w-full"
          defaultValue="Futures"
          collapsible
        >
          <AccordionItem value="Futures">
            <AccordionTrigger>
              <div className="flex gap-x-1">
                <h3 className="text-xl md:text-2xl ">{"Futures"}</h3>
                <h2 className="font-light text-sm md:text-sm">{`[${futureCount.data}]`}</h2>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {futureData.data && futureData.data.length > 0 ? (
                futureData.data?.map((concert) => (
                  <ConcertCard
                    key={`Future-${concert._id}`}
                    date={concert.date}
                    title={concert?.title}
                    city={concert.location?.city || null}
                    place={concert.location?.place || null}
                    address={concert.location?.address || null}
                  />
                ))
              ) : (
                <p className="ml-3 text-lg">{"noConcerts"}</p>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="Past">
            <AccordionTrigger>
              <div className="flex gap-x-1">
                <h3 className="text-xl md:text-2xl ">{"Past"}</h3>
                <h2 className="font-light text-sm md:text-sm">{`[${pastCount.data}]`}</h2>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {pastData.data?.map((concert) => (
                <ConcertCard
                  key={`Past-${concert._id}`}
                  date={concert.date}
                  title={concert?.title}
                  city={concert.location?.city || null}
                  place={concert.location?.place || null}
                  address={concert.location?.address || null}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
