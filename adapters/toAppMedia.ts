import { type EventMediaQueryResult } from "@/sanity.types";
import toAppImages, { type AppImage } from "@/adapters/toAppImage";
import toAppVideos, { type AppVideo } from "@/adapters/toAppVideo";

export type AppMediaItem = AppImage | AppVideo;

export default function toAppMedia(
  eventMedia: EventMediaQueryResult,
): AppMediaItem[] {
  if (!eventMedia?.media) {
    return [];
  }

  return eventMedia.media.reduce<AppMediaItem[]>((acc, item) => {
    // If there is an image
    if (item.image) {
      const images = toAppImages([item.image]);
      acc.push(...images);
    }

    // If there is a video
    if (item.video) {
      const videos = toAppVideos([{ video: item.video }]);
      acc.push(...videos);
    }

    return acc;
  }, []);
}
