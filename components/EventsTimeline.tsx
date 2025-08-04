import { Suspense } from "react";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { majorEventsQuery } from "@/sanity/lib/queries";
import { minorEventsQuery } from "@/sanity/lib/queries";
import MajorCard from "@/components/MajorCard";
import MinorCard from "@/components/MinorCard";
import AnimatedContainer from "@/components/WithViewportAnimation";
import { urlFor } from "@/sanity/lib/sanityImage";

export default async function EventsTimeline({
  excludeYears,
}: {
  excludeYears?: string;
}) {
  const [majorEventsResult, minorEventsResult] = await Promise.all([
    sanityFetch({ query: majorEventsQuery }),
    sanityFetch({ query: minorEventsQuery }),
  ]);

  const majorEvents = majorEventsResult.data;
  const minorEvents = minorEventsResult.data;

  return (
    <>
      {majorEvents.map(({ _id, date, media, title }) => {
        const imageFile = media?.[0]?.imageFile;
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
              <Suspense fallback={<div>Загрузка...</div>}>
                <MajorCard year={majorYear} title={title}>
                  {imageUrl ? (
                    <Image
                      alt={`photo ${title}`}
                      fill
                      src={imageUrl}
                      className="h-full w-full object-cover brightness-75 contrast-125"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-sm text-white">
                      Нет изображения
                    </div>
                  )}
                </MajorCard>
              </Suspense>
            )}
            {filteredMinorEvents.map(({ _id, description, date, media }) => {
              return (
                <AnimatedContainer key={_id}>
                  <MinorCard
                    description={description}
                    date={date}
                    media={media || []}
                    countMedia={media?.length || 0}
                  />
                </AnimatedContainer>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
