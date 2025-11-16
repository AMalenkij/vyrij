import { type GalleryPhotosQueryResult } from "@/sanity.types";

type RawItem = GalleryPhotosQueryResult[number];
type RawImage = RawItem["image"];

export type AppImage = {
  image: {
    id: string;
    alt: string;
    url: string;
    lqip: string;
    dimensions: {
      height: number;
      width: number;
    };
  };
};

export default function toAppImages(sanityImages: RawImage[]): AppImage[] {
  return sanityImages.reduce<AppImage[]>((acc, item) => {
    if (
      item.url &&
      item.lqip &&
      item.id &&
      item.alt &&
      item.dimensions &&
      typeof item.dimensions.height === "number" &&
      typeof item.dimensions.width === "number"
    ) {
      acc.push({
        image: {
          id: item.id,
          alt: item.alt,
          url: item.url,
          lqip: item.lqip,
          dimensions: {
            height: item.dimensions.height,
            width: item.dimensions.width,
          },
        },
      });
    }
    return acc;
  }, []);
}
