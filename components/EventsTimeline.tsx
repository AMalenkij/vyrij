import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { ViewportWrapper } from "@/components/animation/ViewportWrapper";
import MajorCard from "@/components/MajorCard";
import MinorCard from "@/components/MinorCard";
import { LOCALE_MAP } from "@/constants/i18n";
import { transformSanityMedia } from "@/lib/media";
import { sanityFetch } from "@/sanity/lib/live";
import { majorEventsQuery, minorEventsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/sanityImage";
import { MinorEventsQueryResult } from "@/sanity.types";
import { type Locale } from "@/types/app";
import MediaGallery from "./MediaGallery";

interface EventsTimelineProps {
  excludeYears?: string;
  locale: Locale;
}

export default async function EventsTimeline({
  excludeYears,
  locale,
}: EventsTimelineProps) {
  const tCommon = await getTranslations("Common");
  const tEvents = await getTranslations("Events");

  const [majorEventsResult, minorEventsResult] = await Promise.all([
    sanityFetch({ query: majorEventsQuery, params: { locale } }),
    sanityFetch({ query: minorEventsQuery, params: { locale } }),
  ]);

  const majorEvents = majorEventsResult.data;
  const minorEvents = minorEventsResult.data;

  const minorEventsByYear = minorEvents.reduce(
    (acc, event) => {
      if (!event) return acc;
      const year = new Date(event.date).getFullYear().toString();
      if (!acc[year]) acc[year] = [];
      acc[year].push(event);
      return acc;
    },
    {} as Record<string, NonNullable<MinorEventsQueryResult[number]>[]>,
  );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(LOCALE_MAP[locale], {
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {majorEvents.map(({ _id, date, media, eventTitle }) => {
        const imageFile = media?.[0].imageFile;
        const imageUrl = urlFor(imageFile).url();
        const dimensions = media?.[0].dimensions;
        const lqip = media?.[0].lqip;

        const majorYear = new Date(date).getFullYear().toString();
        const filteredMinorEvents = minorEventsByYear[majorYear] || [];
        const shouldShowMajorCard = majorYear !== excludeYears;

        return (
          <div key={_id}>
            {shouldShowMajorCard && (
              <Suspense fallback={<div>{tCommon("loading")}</div>}>
                <MajorCard
                  year={majorYear}
                  title={eventTitle || tEvents("defaultTitle")}
                >
                  <Image
                    alt={`photo ${eventTitle}`}
                    width={dimensions?.width}
                    height={dimensions?.height}
                    src={imageUrl}
                    className="h-full w-full object-cover brightness-75 contrast-125"
                    blurDataURL={lqip ? lqip : undefined}
                  />
                </MajorCard>
              </Suspense>
            )}

            {filteredMinorEvents.map(
              ({
                _id: minorId,
                eventDescription,
                date: minorDate,
                media: minorMedia,
              }) => {
                const formattedDate = formatDate(minorDate);
                const cleanMedia = transformSanityMedia(minorMedia);

                return (
                  <ViewportWrapper once key={minorId}>
                    <MinorCard
                      description={eventDescription}
                      date={formattedDate}
                    >
                      <MediaGallery media={cleanMedia} />
                    </MinorCard>
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
