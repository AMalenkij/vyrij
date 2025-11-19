import toAppEventTitle from "@/adapters/toAppEventTitle";
import toAppImage, { type AppImage } from "@/adapters/toAppImage";
import type { MajorEventsQueryResult } from "@/sanity.types";

export type AppEvent = {
  id: string;
  title: string;
  date: Date;
  media: AppImage[];
};

export type EventAdapterTranslations = {
  noTitle: string;
};

export default function toAppMajorEvents(
  data: MajorEventsQueryResult,
  translations: EventAdapterTranslations,
  excludeYear?: string | undefined,
): AppEvent[] {
  if (!data) return [];

  return data.reduce<AppEvent[]>((acc, item) => {
    if (!item.id || !item.title || !item.date) {
      return acc;
    }

    // Year filtering logic
    const eventYear = new Date(item.date).getFullYear().toString();
    if (excludeYear && eventYear === excludeYear) {
      return acc;
    }

    const adaptedTitle = toAppEventTitle(item.title, translations.noTitle);
    const parsedDate = new Date(item.date);
    const rawImages =
      item.media
        ?.map((m) => m.image)
        .filter((img): img is NonNullable<typeof img> => !!img) || [];

    const adaptedMedia = toAppImage(rawImages);

    acc.push({
      id: item.id,
      title: adaptedTitle,
      date: parsedDate,
      media: adaptedMedia,
    });

    return acc;
  }, []);
}
