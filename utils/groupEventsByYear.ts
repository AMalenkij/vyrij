import { urlFor } from "@/sanity/lib/sanityImage";
import {
  type MajorEventsQueryResult,
  MinorEventsQueryResult,
} from "@/sanity.types";
import { type PortableTextBlock } from "@portabletext/types";

// Типы для возвращаемых данных
export interface GroupedMinorEvent {
  id: string;
  description: PortableTextBlock[];
  date: string;
  photoUrls: string[];
}

export interface GroupedMajorEvent {
  id: string;
  date: string;
  title: string;
  photoUrl: string | null;
  type: "major";
  minorEvents: GroupedMinorEvent[];
}

export type GroupedEventsResult = GroupedMajorEvent[];

// Типизированная функция
export const groupEventsByYear = (
  majorEvents: MajorEventsQueryResult,
  minorEvents: MinorEventsQueryResult,
): GroupedEventsResult => {
  return majorEvents.map((majorEvent) => {
    const majorYear = new Date(majorEvent.date).getFullYear().toString();

    // Фильтруем минорные события для этого года
    const filteredMinorEvents = minorEvents.filter(
      (minorEvent): minorEvent is NonNullable<typeof minorEvent> =>
        minorEvent !== null &&
        new Date(minorEvent.date).getFullYear().toString() === majorYear,
    );

    return {
      id: majorEvent._id,
      date: majorYear,
      title: majorEvent.title,
      photoUrl: majorEvent.media?.[0]?.imageFile
        ? urlFor(majorEvent.media[0].imageFile).url()
        : null,
      type: "major" as const,
      minorEvents: filteredMinorEvents.map(
        (minorEvent): GroupedMinorEvent => ({
          id: minorEvent._id,
          description: (minorEvent.description || []) as PortableTextBlock[],
          date: minorEvent.date,
          // Изменяем обработку изображений для minor событий
          photoUrls:
            minorEvent?.media
              ?.map((photo) =>
                photo?.imageFile ? urlFor(photo.imageFile).url() : null,
              )
              .filter((url): url is string => url !== null) || [], // Типизированный фильтр
        }),
      ),
    };
  });
};
