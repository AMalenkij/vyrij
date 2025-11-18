import type { EventQueryResult } from "@/sanity.types";
import toAppEventTitle from "@/adapters/toAppEventTitle";
import toAppTime from "@/adapters/toAppTime";
import type { PortableTextBlock } from "@portabletext/types";

type RawEvent = EventQueryResult;

export interface AppEvent {
  id: string;
  title: string;
  description: PortableTextBlock[];
  date: string;
  time: string;
  tags: {
    id: string;
    name: string;
  }[];
}

export type EventAdapterTranslations = {
  noTitle: string;
  noTime: string;
  noDescription: string;
};

function createFallbackDescription(text: string): PortableTextBlock[] {
  return [
    {
      _type: "block",
      _key: "fallback-block-key", // Ключ може бути довільним
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "fallback-span-key",
          marks: [],
          text: text, // noDescription
        },
      ],
    },
  ];
}

export default function toAppEvent(
  rawData: RawEvent,
  translations: EventAdapterTranslations,
): AppEvent | null {
  if (!rawData || !rawData.id || !rawData.title || !rawData.date) {
    return null;
  }

  const adaptedTitle = toAppEventTitle(rawData.title, translations.noTitle);
  const adaptedTime = toAppTime(rawData.time, translations.noTime);

  const description =
    rawData.description && rawData.description.length > 0
      ? rawData.description // 1. Використовуємо реальні дані, якщо вони є
      : createFallbackDescription(translations.noDescription); // 2. Або створюємо заглушку

  return {
    id: rawData.id,
    title: adaptedTitle,
    description: description as PortableTextBlock[],
    date: rawData.date,
    time: adaptedTime,
    tags: rawData.tags,
  };
}
