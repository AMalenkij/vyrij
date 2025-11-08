import { urlFor } from "@/sanity/lib/sanityImage";
import { CleanMediaItem } from "@/types/app";

// A type to represent the different shapes of media items from Sanity
type SanityMediaObject = {
  _id?: string;
  title?: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  imageFile?: object | null;
};

/**
 * A utility function to transform different shapes of Sanity media arrays
 * into a consistent CleanMediaItem array.
 * @param media - The array of media items from Sanity.
 * @returns An array of CleanMediaItem objects.
 */
export function transformSanityMedia(
  media: SanityMediaObject[] | null | undefined,
): CleanMediaItem[] {
  if (!media) {
    return [];
  }

  return media
    .map((item, index): CleanMediaItem | null => {
      if (!item) return null;

      const id = item._id || `media-${index}`;
      const title = item.title;

      // Handle video
      if (item.videoUrl) {
        return {
          _id: id,
          type: "video",
          url: item.videoUrl,
          title: title,
        };
      }

      // Handle image from imageUrl (string)
      if (item.imageUrl) {
        return {
          _id: id,
          type: "photo",
          url: item.imageUrl,
          title: title,
        };
      }

      // Handle image from imageFile (object)
      if (item.imageFile) {
        const url = urlFor(item.imageFile).url();
        if (url) {
          return {
            _id: id,
            type: "photo",
            url: url,
            title: title,
          };
        }
      }

      return null;
    })
    .filter((item): item is CleanMediaItem => item !== null);
}
