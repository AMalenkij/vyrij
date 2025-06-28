import { urlFor } from "@/sanity/lib/sanityImage";
import {
  type MajorEventsQueryResult,
  MinorEventsQueryResult,
} from "@/sanity/types";

export const groupEventsByYear = (
  majorEvents: MajorEventsQueryResult[],
  minorEvents: MinorEventsQueryResult[],
) => {
  return majorEvents.map((majorEvent) => {
    const majorYear = new Date(majorEvent.date).getFullYear().toString();
    // Фильтруем минорные события для этого года
    const filteredMinorEvents = minorEvents.filter(
      (minorEvent) =>
        minorEvent &&
        new Date(minorEvent.date).getFullYear().toString() === majorYear,
    );
    return {
      id: majorEvent._id,
      date: majorYear,
      title: majorEvent.title,
      photoUrl: majorEvent.media?.[0]?.imageFile
        ? urlFor(majorEvent.media[0].imageFile).url()
        : null,
      // videoUrl: majorEvent.media?.[0]?.videoUrl || null,
      type: "major",
      minorEvents: filteredMinorEvents.map((minorEvent) => ({
        id: minorEvent._id,
        description: minorEvent.description,
        date: minorEvent.date,
        // Изменяем обработку изображений для minor событий
        photoUrls:
          minorEvent?.media
            ?.map((photo) =>
              photo?.imageFile ? urlFor(photo.imageFile).url() : null,
            )
            .filter(Boolean) || [], // Фильтруем null значения сразу
      })),
    };
  });
};
