import { type GalleryPhotosQueryResult } from "@/sanity.types";

type RawImages = GalleryPhotosQueryResult[number];
type RawImage = RawImages["image"];

type AppImage = {
  image: {
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
      item.dimensions &&
      typeof item.dimensions.height === "number" &&
      typeof item.dimensions.width === "number"
    ) {
      acc.push({
        image: {
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
