import toAppEventTitle from "@/adapters/toAppEventTitle";
import toAppMedia, { AppMediaItem } from "@/adapters/toAppMedia";
import { EventsQueryResult } from "@/sanity.types";

export type Slug = {
  _type: "slug";
  current: string;
};

export interface AppEvents {
  id: string;
  title: string;
  date: Date;
  slug: Slug;
  tags: {
    id: string;
    name: string;
  }[];
  media: AppMediaItem[];
}

export type EventAdapterTranslations = {
  noTitle: string;
};

export default function toAppEvents(
  data: EventsQueryResult,
  translations: EventAdapterTranslations,
): AppEvents[] {
  return data.reduce<AppEvents[]>((acc, item) => {
    if (item?.id && item.title && item.date && item.slug && item.media) {
      const adaptedTitle = toAppEventTitle(item.title, translations.noTitle);
      const parsedDate = new Date(item.date);

      const adaptedMedia = toAppMedia({ media: [item.media] });

      acc.push({
        id: item.id,
        title: adaptedTitle,
        date: parsedDate,
        slug: item.slug,
        tags: item.tags,
        media: adaptedMedia,
      });
    }
    return acc;
  }, []);
}
