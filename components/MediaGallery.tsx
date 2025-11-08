import RenderPhoto from "@/components/RenderPhoto";
import YouTubeVideo from "./YouTubeVideo";
import { CleanMediaItem } from "@/types/app";

function MediaComponent({
  mediaItem,
  className,
}: {
  mediaItem: CleanMediaItem;
  className?: string;
}) {
  if (mediaItem.type === "video") {
    return <YouTubeVideo url={mediaItem.url} className={className} />;
  }

  if (mediaItem.type === "photo") {
    return <RenderPhoto photoUrl={mediaItem.url} className={className} />;
  }

  return null;
}

export default function MediaGallery({
  media,
  variant = "minorCard",
}: {
  media: CleanMediaItem[];
  variant?: "minorCard" | "eventPage";
}) {
  if (!media || media.length === 0) return null;
  const countMedia = media.length;

  const getItem = (index: number, className?: string) => (
    <MediaComponent
      key={media[index]._id}
      mediaItem={media[index]}
      className={className}
    />
  );

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

  // minorCard variant is the default
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
    default: // 4 or more
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
