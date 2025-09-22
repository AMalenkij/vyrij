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
import { getTranslations } from "next-intl/server";
import { type Locale } from "@/types/app";

export default async function Concerts({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const [futureData, pastData, futureCount, pastCount] = await Promise.all([
    sanityFetch({ query: futureEventsQuery, params: { locale } }),
    sanityFetch({ query: pastEventsQuery, params: { locale } }),
    sanityFetch({ query: futureEventsCountQuery }),
    sanityFetch({ query: pastEventsCountQuery }),
  ]);
  let allCount = futureCount.data + pastCount.data;
  const tConcerts = await getTranslations("Concerts");

  const concertTranslations = {
    noLocation: tConcerts("noLocation"),
    noTime: tConcerts("noTime"),
    noTitle: tConcerts("noTitle"),
    locationTitle: tConcerts("locationTitle"),
    addressTitle: tConcerts("addressTitle"),
  };

  return (
    <div className="container mx-auto min-h-screen px-1">
      <SubHeader
        title={tConcerts("subHeader")}
        counter={allCount}
        sectionName={tConcerts("sectionName")}
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
              <h3 className="text-xl md:text-2xl ">{tConcerts("futures")}</h3>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {futureData.data.length > 0 ? (
              futureData.data.map(
                ({ _id, date, time, eventTitle, location }, index) => (
                  <ConcertCard
                    key={`Future-${_id}`}
                    index={index}
                    date={date}
                    time={time}
                    title={eventTitle}
                    location={location}
                    translation={concertTranslations}
                    locale={locale}
                  />
                ),
              )
            ) : (
              <p className="ml-3 text-lg">{tConcerts("noConcerts")}</p>
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
              <h3 className="text-xl md:text-2xl ">{tConcerts("past")}</h3>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {pastData.data?.map(
              ({ _id, date, time, eventTitle, location }, index) => (
                <ConcertCard
                  key={`Past-${_id}`}
                  index={index}
                  date={date}
                  time={time}
                  title={eventTitle}
                  location={location}
                  translation={concertTranslations}
                  locale={locale}
                />
              ),
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
