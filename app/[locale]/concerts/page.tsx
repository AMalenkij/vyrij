import ConcertCard from "@/components/ConcertCard";
import SubHeader from "@/components/SubHeader";
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

const texts = {
  title: "Concerts",
  sectionName: "Наши концерты",
  futures: "Futures",
  past: "Past",
  noConcerts: "noConcerts",
};

export default async function Concerts() {
  const [futureData, pastData, futureCount, pastCount] = await Promise.all([
    sanityFetch({ query: futureEventsQuery }),
    sanityFetch({ query: pastEventsQuery }),
    sanityFetch({ query: futureEventsCountQuery }),
    sanityFetch({ query: pastEventsCountQuery }),
  ]);
  let allCount = futureCount.data + pastCount.data;
  return (
    <>
      <div className="container mx-auto min-h-screen">
        <SubHeader
          title={texts.title}
          counter={allCount}
          sectionName={texts.sectionName}
        />
        <Accordion
          type="single"
          className="w-full"
          defaultValue="Futures"
          collapsible
        >
          <AccordionItem value="Futures">
            <AccordionTrigger>
              <div className="flex gap-x-1">
                <p className="font-light text-sm md:text-sm">
                  {"{ "}
                  {futureCount.data}
                  {" }"}
                </p>
                <h3 className="text-xl md:text-2xl ">{texts.futures}</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {futureData.data && futureData.data.length > 0 ? (
                futureData.data?.map((concert, index) => (
                  <ConcertCard
                    key={`Future-${concert._id}`}
                    index={index}
                    date={concert.date}
                    time={concert.time || null}
                    title={concert?.title}
                    location={concert.location || null}
                  />
                ))
              ) : (
                <p className="ml-3 text-lg">{texts.noConcerts}</p>
              )}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="Past">
            <AccordionTrigger>
              <div className="flex gap-x-1">
                <p className="font-light text-sm md:text-sm">
                  {"{ "}
                  {pastCount.data}
                  {" }"}
                </p>
                <h3 className="text-xl md:text-2xl ">{texts.past}</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {pastData.data?.map((concert, index) => (
                <ConcertCard
                  key={`Past-${concert._id}`}
                  index={index}
                  date={concert.date}
                  time={concert.time || null}
                  title={concert?.title}
                  location={concert.location || null}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
