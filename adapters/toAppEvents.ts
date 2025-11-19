import toAppEventTitle from "@/adapters/toAppEventTitle";
import toAppMedia, { AppMediaItem } from "@/adapters/toAppMedia";

export type Slug = {
  _type: "slug";
  current: string;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type EventsQueryTestResult = Array<{
  id: string;
  title: Array<{
    _type: "localeString";
    en?: string;
    pl?: string;
    ua?: string;
  }> | null;
  slug: Slug;
  date: string;
  tags: Array<{
    id: string;
    name: string;
  }>;
  media: {
    image: {
      id: string;
      alt: string;
      url: string | null;
      lqip: string | null;
      dimensions: SanityImageDimensions | null;
    };
    video: {
      id: string;
      alt: string;
      url: string | null;
    };
  } | null;
}>;

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
  data: EventsQueryTestResult,
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
