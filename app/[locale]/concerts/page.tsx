import ConcertCard from "@/components/ConcertCard";
import SubHeader from "@/components/SubHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { sanityFetch } from "@/sanity/lib/live";
import { futureEventsQuery, pastEventsQuery } from "@/sanity/lib/queries";
import { getTranslations } from "next-intl/server";
import { type Locale } from "@/types/app";
import { toAppConcerts } from "@/adapters/toAppConcert";
import formatDate from "@/formatters/formattedDate";

type ConcertsPageProps = {
  params: Promise<{ locale: Locale }>;
};

type ConcertTranslations = {
  noLocation: string;
  noTime: string;
  noTitle: string;
  locationTitle: string;
  addressTitle: string;
};

export default async function Concerts({ params }: ConcertsPageProps) {
  const { locale } = await params;

  // fetch data
  const [futureConcerts, pastConcerts] = await Promise.all([
    sanityFetch({ query: futureEventsQuery, params: { locale } }),
    sanityFetch({ query: pastEventsQuery, params: { locale } }),
  ]);

  // translations
  const t = await getTranslations("Concerts");
  const concertTranslations: ConcertTranslations = {
    noLocation: t("noLocation"),
    noTime: t("noTime"),
    noTitle: t("noTitle"),

    locationTitle: t("locationTitle"),
    addressTitle: t("addressTitle"),
  };

  // adapter translations
  const adaptedFutureConcerts =
    futureConcerts.data.length > 0
      ? toAppConcerts(futureConcerts.data, concertTranslations)
      : [];

  const adaptedPastConcerts =
    pastConcerts.data.length > 0
      ? toAppConcerts(pastConcerts.data, concertTranslations)
      : [];

  const totalCount = adaptedFutureConcerts.length + adaptedPastConcerts.length;

  return (
    <div className="container mx-auto min-h-screen px-1">
      <SubHeader
        title={t("subHeader")}
        counter={totalCount}
        sectionName={t("sectionName")}
      />

      <Accordion
        type="single"
        className="w-full"
        defaultValue="futures"
        collapsible
      >
        {/* Future Concerts */}
        <AccordionItem value="futures">
          <AccordionTrigger>
            <div className="flex items-center gap-x-2">
              <span className="font-light text-sm">
                {`{ ${adaptedFutureConcerts.length} }`}
              </span>
              <h3 className="text-xl md:text-2xl">{t("futures")}</h3>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {adaptedFutureConcerts.length > 0 ? (
              <div className="space-y-4">
                {adaptedFutureConcerts.map((concert, index) => (
                  <ConcertCard
                    key={concert.id}
                    index={index}
                    formattedDate={formatDate(concert.date, locale)}
                    time={concert.time}
                    title={concert.title}
                    location={concert.location}
                    translation={concertTranslations}
                  />
                ))}
              </div>
            ) : (
              <p className="ml-3 text-lg text-muted-foreground">
                {t("noConcerts")}
              </p>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* Past Concerts */}
        <AccordionItem value="past">
          <AccordionTrigger>
            <div className="flex items-center gap-x-2">
              <span className="font-light text-sm">
                {`{ ${adaptedPastConcerts.length} }`}
              </span>
              <h3 className="text-xl md:text-2xl">{t("past")}</h3>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {adaptedPastConcerts.length > 0 ? (
              <div className="space-y-4">
                {adaptedPastConcerts.map((concert, index) => (
                  <ConcertCard
                    key={concert.id}
                    index={index}
                    formattedDate={formatDate(concert.date, locale)}
                    time={concert.time}
                    title={concert.title}
                    location={concert.location}
                    translation={concertTranslations}
                  />
                ))}
              </div>
            ) : (
              <p className="ml-3 text-lg text-muted-foreground">
                {t("noConcerts")}
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
