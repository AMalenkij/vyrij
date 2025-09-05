import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { majorEventsQuery } from "@/sanity/lib/queries";
import { minorEventsQuery } from "@/sanity/lib/queries";
import MajorCard from "@/components/MajorCard";
import MinorCard from "@/components/MinorCard";
import { ViewportWrapper } from "@/components/animation/ViewportWrapper";
import { urlFor } from "@/sanity/lib/sanityImage";
import { type Locale } from "@/types/app";
import { LOCALE_MAP } from "@/constants/i18n";

export default async function EventsTimeline({
  excludeYears,
  locale,
}: {
  excludeYears?: string;
  locale: Locale;
}) {
  const tCommon = await getTranslations("Common");
  const tEvents = await getTranslations("Events");

  const [majorEventsResult, minorEventsResult] = await Promise.all([
    sanityFetch({ query: majorEventsQuery, params: { locale } }),
    sanityFetch({ query: minorEventsQuery, params: { locale } }),
  ]);

  const majorEvents = majorEventsResult.data;
  const minorEvents = minorEventsResult.data;

  return (
    <>
      {majorEvents.map(({ _id, date, media, eventTitle }) => {
        const imageFile = media?.[0].imageFile;
        const imageUrl = imageFile ? urlFor(imageFile).url() : null;
        const majorYear = new Date(date).getFullYear().toString();

        const filteredMinorEvents = minorEvents.filter(
          (minorEvent): minorEvent is NonNullable<typeof minorEvent> =>
            minorEvent !== null &&
            new Date(minorEvent.date).getFullYear().toString() === majorYear,
        );

        return (
          <div key={_id}>
            {majorYear !== excludeYears && (
              <Suspense fallback={<div>{tCommon("loading")}</div>}>
                <MajorCard
                  year={majorYear}
                  title={eventTitle || tEvents("defaultTitle")}
                >
                  {imageUrl ? (
                    <Image
                      alt={`photo ${eventTitle}`}
                      fill
                      src={imageUrl}
                      className="h-full w-full object-cover brightness-75 contrast-125"
                    />
                  ) : null}
                </MajorCard>
              </Suspense>
            )}
            {filteredMinorEvents.map(
              ({ _id, eventDescription, date, media }) => {
                const formattedMinorDate = new Date(date).toLocaleDateString(
                  LOCALE_MAP[locale],
                  {
                    month: "long",
                    day: "numeric",
                  },
                );
                return (
                  <ViewportWrapper key={_id}>
                    <MinorCard
                      description={eventDescription}
                      date={formattedMinorDate}
                      media={media || []}
                      countMedia={media?.length || 0}
                    />
                  </ViewportWrapper>
                );
              },
            )}
          </div>
        );
      })}
    </>
  );
}
