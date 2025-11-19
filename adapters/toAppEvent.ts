import type { EventQueryResult } from "@/sanity.types";
import toAppEventTitle from "@/adapters/toAppEventTitle";
import type { PortableTextBlock } from "@portabletext/types";
import toPortableText from "./toPortableText";

type RawEvent = EventQueryResult;

export interface AppEvent {
  id: string;
  title: string;
  description: PortableTextBlock[];
  date: Date;
  tags: {
    id: string;
    name: string;
  }[];
}

export type EventAdapterTranslations = {
  noTitle: string;
  noDescription: string;
};

export default function toAppEvent(
  rawData: RawEvent,
  translations: EventAdapterTranslations,
): AppEvent | null {
  if (!rawData || !rawData.id || !rawData.title || !rawData.date) {
    return null;
  }

  const adaptedTitle = toAppEventTitle(rawData.title, translations.noTitle);
  const parsedDate = new Date(rawData.date);
  const description =
    rawData.description && rawData.description.length > 0
      ? rawData.description // 1. Використовуємо реальні дані, якщо вони є
      : toPortableText(translations.noDescription); // 2. Або створюємо заглушку

  return {
    id: rawData.id,
    title: adaptedTitle,
    description: description as PortableTextBlock[],
    date: parsedDate,
    tags: rawData.tags,
  };
}
