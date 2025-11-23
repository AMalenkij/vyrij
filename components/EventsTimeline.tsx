import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import toAppEventsByYear from "@/adapters/toAppEventsByYear";
import toAppMajorEvent from "@/adapters/toAppMajorEvents";
import toAppMinorEvent from "@/adapters/toAppMinorEvents";
import { ViewportWrapper } from "@/components/animation/ViewportWrapper";
import MajorCard from "@/components/MajorCard";
import MediaGallery from "@/components/MediaGallery";
import { TypographyComponents } from "@/components/TypographyComponents";
import { formatDateLong } from "@/formatters/formattedDate";
import { client } from "@/sanity/lib/client";
import { majorEventsQuery, minorEventsQuery } from "@/sanity/lib/queries";
import type { Locale } from "@/types/app";

interface EventsTimelineProps {
  excludeYear?: string;
  locale: Locale;
}

export default async function EventsTimeline({
  excludeYear,
  locale,
}: EventsTimelineProps) {
  const tEvents = await getTranslations("Events");

  const [majorEventsResult, minorEventsResult] = await Promise.all([
    client.fetch(majorEventsQuery, { locale }),
    client.fetch(minorEventsQuery, { locale }),
  ]);

  const eventTranslations = {
    noTitle: tEvents("noTitle"),
    noDescription: tEvents("noDescription"),
  };

  const majorEvents = toAppMajorEvent(
    majorEventsResult,
    eventTranslations,
    excludeYear,
  );

  const minorEvents = toAppMinorEvent(minorEventsResult, eventTranslations);

  const unifiedEvents = toAppEventsByYear(majorEvents, minorEvents);

  return (
    <>
      {unifiedEvents.map(({ year, majorEvent, minorEvents }) => {
        return (
          <div key={year} className="mb-24">
            {majorEvent && (
              <MajorCard year={year} title={majorEvent.title}>
                <Image
                  alt={`photo ${majorEvent.title}`}
                  width={majorEvent.media[0].image.dimensions.width}
                  height={majorEvent.media[0].image.dimensions.height}
                  src={majorEvent.media[0].image.url}
                  className="h-full w-full object-cover brightness-75 contrast-125"
                  blurDataURL={majorEvent.media[0].image.lqip}
                  placeholder="blur"
                  sizes="100vw"
                  priority={true}
                />
              </MajorCard>
            )}
            {minorEvents.map(({ id, date, media, description }) => {
              const formattedDate = formatDateLong(date, locale);

              return (
                <ViewportWrapper once key={id}>
                  <article className="container mx-auto my-16 px-1 md:px-12">
                    <header>
                      <h2 className="mb-4 font-semibold text-2xl lg:text-3xl">
                        {formattedDate}
                      </h2>
                    </header>
                    <div className="whitespace-pre-line text-lg lg:text-xl">
                      <PortableText
                        value={description}
                        components={TypographyComponents}
                      />
                    </div>
                    <MediaGallery media={media} variant="minorCard" />
                  </article>
                </ViewportWrapper>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
