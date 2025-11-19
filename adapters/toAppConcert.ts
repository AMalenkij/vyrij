import { type FutureEventsQueryResult } from "@/sanity.types";
import toAppEventTitle from "@/adapters/toAppEventTitle";
import toAppTime from "@/adapters/toAppTime";

type RawConcert = FutureEventsQueryResult[number];

export interface AppConcert {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: {
    place: string;
    address: string;
  };
}

export type ConcertAdapterTranslations = {
  noTime: string;
  noTitle: string;
  noLocation: string;
};

export function toAppConcerts(
  rawData: RawConcert[],
  translations: ConcertAdapterTranslations,
): AppConcert[] {
  return rawData.reduce<AppConcert[]>((acc, item) => {
    if (item?.id && item.title && item.date) {
      const adaptedTitle = toAppEventTitle(item.title, translations.noTitle);
      const parsedDate = new Date(item.date);
      const adaptedTime = toAppTime(item.time, translations.noTime);
      const adaptedLocation = {
        place: item.location?.place || translations.noLocation,
        address: item.location?.address || translations.noLocation,
      };

      acc.push({
        id: item.id,
        title: adaptedTitle,
        date: parsedDate,
        time: adaptedTime,
        location: adaptedLocation,
      });
    }
    return acc;
  }, []);
}
