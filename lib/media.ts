import { urlFor } from "@/sanity/lib/sanityImage";
import {
  SanityImageCrop,
  SanityImageDimensions,
  SanityImageHotspot,
} from "@/sanity.types";
import { CleanMediaItem } from "@/types/app";

export type SanityMediaObject = {
  _id: string;
  title?: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  imageFile?: {
    asset?: {
      _ref: string;
      _type: "reference";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  } | null;
  lqip: string | null;
  dimensions: SanityImageDimensions | null;
};

/**
 * Transforms Sanity media objects into a consistent CleanMediaItem array.
 * @param media - The array of media items from Sanity.
 * @returns An array of CleanMediaItem objects.
 */
export function transformSanityMedia(
  media: SanityMediaObject[] | null | undefined,
): CleanMediaItem[] {
  if (!media) return [];

  return media
    .map((item): CleanMediaItem | null => {
      if (!item?._id) return null;

      const { _id: id, title, lqip, dimensions } = item;

      // Validate dimensions if present
      const validDimensions =
        dimensions?.width && dimensions?.height
          ? { width: dimensions.width, height: dimensions.height }
          : undefined;

      // Video handling
      if (item.videoUrl) {
        return {
          _id: id,
          type: "video",
          url: item.videoUrl,
          title,
        };
      }

      // Direct imageUrl (string)
      if (item.imageUrl) {
        return {
          _id: id,
          type: "photo",
          url: item.imageUrl,
          title,
          lqip: lqip ?? undefined,
          dimensions: validDimensions,
        };
      }

      // imageFile object
      if (item.imageFile) {
        const url = urlFor(item.imageFile).url();
        if (url) {
          return {
            _id: id,
            type: "photo",
            url,
            title,
            lqip: lqip ?? undefined,
            dimensions: validDimensions,
          };
        }
      }

      return null;
    })
    .filter((item): item is CleanMediaItem => item !== null);
}
