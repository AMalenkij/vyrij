import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { majorEventsQuery } from "@/sanity/lib/queries";
import { minorEventsQuery } from "@/sanity/lib/queries";
import MajorCard from "@/components/MajorCard";
import MinorCard from "@/components/MinorCard";
import AnimatedContainer from "@/components/WithViewportAnimation";
import { groupEventsByYear } from "@/utils/groupEventsByYear";

export default async function EventsTimeline({
  excludeYears,
}: {
  excludeYears?: string;
}) {
  const { data: majorEvents } = await sanityFetch({
    query: majorEventsQuery,
  });
  const { data: minorEvents } = await sanityFetch({
    query: minorEventsQuery,
  });

  const eventData = groupEventsByYear(majorEvents, minorEvents);

  return (
    <>
      {eventData?.map((event) => {
        return (
          <section key={event.id}>
            {event.date !== excludeYears && (
              <MajorCard year={event.date} title={event.title}>
                {event.photoUrl && (
                  <Image
                    alt={`photo ${event.title}`}
                    fill
                    src={event.photoUrl}
                    className="h-full w-full object-cover brightness-75 contrast-125"
                  />
                )}
              </MajorCard>
            )}
            {/* Рендерим каждое минорное событие отдельно */}
            {event.minorEvents?.map((minorEvent) => (
              <AnimatedContainer key={minorEvent.id}>
                <MinorCard eventsWithMedia={minorEvent} />
              </AnimatedContainer>
            ))}
          </section>
        );
      })}
    </>
  );
}
