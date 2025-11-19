import RenderPhoto from "@/components/RenderPhoto";
import YouTubeVideo from "./YouTubeVideo";
import type { AppImage } from "@/adapters/toAppImage";
import type { AppVideo } from "@/adapters/toAppVideo";

export type AppMediaItem = AppImage | AppVideo;

type Props = {
  media: AppMediaItem[];
  variant: "minorCard" | "eventPage";
};

function MediaComponent({
  mediaItem,
  className,
}: {
  mediaItem: AppMediaItem;
  className?: string;
}) {
  if ("image" in mediaItem) {
    const img = mediaItem.image;
    return (
      <RenderPhoto
        photoUrl={img.url}
        className={className ?? "pt-8"} // pt-8 was only for photos in the old code
        lqip={img.lqip}
        dimensions={img.dimensions}
        alt={img.alt}
      />
    );
  }

  if ("video" in mediaItem) {
    const vid = mediaItem.video;
    return <YouTubeVideo url={vid.url} alt={vid.alt} className={className} />;
  }

  return null;
}

export default function MediaGallery({ media, variant = "minorCard" }: Props) {
  if (!media || media.length === 0) return null;

  const countMedia = media.length;

  const getItem = (index: number, className?: string) => {
    const item = media[index];
    const key = "image" in item ? item.image.id : item.video.id;

    return <MediaComponent key={key} mediaItem={item} className={className} />;
  };

  // ==================== eventPage variant ====================
  if (variant === "eventPage") {
    switch (countMedia) {
      case 1:
        return getItem(0);
      case 2:
        return (
          <div className="flex flex-col gap-4">
            {getItem(0)}
            {getItem(1)}
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-2 gap-4">
            {getItem(0, "col-span-2")}
            {getItem(1)}
            {getItem(2)}
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-2 gap-4">
            {getItem(0)}
            {getItem(1)}
            {getItem(2)}
            {getItem(3)}
          </div>
        );
    }
  }

  // ==================== minorCard variant (default) ====================
  switch (countMedia) {
    case 1:
      return getItem(0);
    case 2:
      return (
        <div className="grid grid-cols-2 gap-4">
          {getItem(0)}
          {getItem(1)}
        </div>
      );
    case 3:
      return (
        <div className="">
          {getItem(0, "-ml-16 md:col-span-2")}
          <div className="grid grid-cols-2 gap-4">
            {getItem(1)}
            {getItem(2)}
          </div>
        </div>
      );
    default:
      // 4 or more — show only the first 4, as before
      return (
        <div className="grid h-[calc(70vh-250px)] grid-cols-2 gap-4 lg:h-[calc(100vh-200px)]">
          {getItem(0, "md:-ml-6 ml-2")}
          {getItem(1)}
          {getItem(2)}
          {getItem(3)}
        </div>
      );
  }
}
