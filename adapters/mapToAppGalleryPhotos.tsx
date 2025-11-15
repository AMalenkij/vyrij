import toAppImage from "@/adapters/toAppImage";
import { type GalleryPhotosQueryResult } from "@/sanity.types";

type RawGalleryItem = GalleryPhotosQueryResult[number];

export type AppGalleryPhoto = {
  _id: string;
  title: string;
  image: {
    url: string;
    lqip: string;
    dimensions: {
      height: number;
      width: number;
    };
  };
};

export default function mapToAppGalleryPhotos(
  mediaItems: RawGalleryItem[],
): AppGalleryPhoto[] {
  const images = mediaItems.map((item) => item.image);

  const transformedImages = toAppImage(images);

  return mediaItems.reduce<AppGalleryPhoto[]>((acc, item, index) => {
    if (transformedImages[index]) {
      acc.push({
        _id: item._id,
        title: item.title,
        image: transformedImages[index].image,
      });
    }
    return acc;
  }, []);
}
