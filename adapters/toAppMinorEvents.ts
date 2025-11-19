import { type MinorEventsQueryResult } from "@/sanity.types";
import { type AppImage } from "@/adapters/toAppImage";
import toAppMedia from "@/adapters/toAppMedia";
import { type AppVideo } from "@/adapters/toAppVideo";
import toPortableText from "@/adapters/toPortableText";
import type { PortableTextBlock } from "next-sanity";

export type AppMediaItem = AppImage | AppVideo;

export type AppEvent = {
  id: string;
  description: PortableTextBlock[];
  date: Date;
  media: AppMediaItem[];
};

export type EventAdapterTranslations = {
  noDescription: string;
};

export default function toAppMinorEvents(
  data: MinorEventsQueryResult,
  translations: EventAdapterTranslations,
): AppEvent[] {
  if (!data) return [];

  return data.reduce<AppEvent[]>((acc, item) => {
    if (!item.id || !item.date) {
      return acc;
    }
    const parsedDate = new Date(item.date);

    const description =
      item.description && item.description.length > 0
        ? item.description // 1. Use real data if it exists
        : toPortableText(translations.noDescription); // 2. Or create a placeholder

    const adaptedMedia = toAppMedia({ media: item.media });
    acc.push({
      id: item.id,
      description: description as PortableTextBlock[],
      date: parsedDate,
      media: adaptedMedia,
    });

    return acc;
  }, []);
}
