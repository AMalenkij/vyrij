import { PortableText } from "@portabletext/react";
import { type PortableTextBlock } from "@portabletext/types";
import RenderPhoto from "@/components/RenderPhoto";
import { urlFor } from "@/sanity/lib/sanityImage";
import YouTubeVideo from "./YouTubeVideo";
import { TypographyComponents } from "@/components/TypographyComponents";
import { type SanityImageSource } from "@sanity/image-url/lib/types/types";

// Define the media item type
type MediaItem = {
  videoUrl: string | null;
  imageFile: SanityImageSource | null;
};

function MediaComponent({
  videoUrl,
  imageFile,
  className,
}: {
  videoUrl: string | null;
  imageFile: SanityImageSource | null;
  className?: string;
}) {
  if (videoUrl) {
    return <YouTubeVideo url={videoUrl} className={className} />;
  }

  if (imageFile) {
    const imgUrl = urlFor(imageFile).url();
    if (typeof imgUrl === "string") {
      return <RenderPhoto photoUrl={imgUrl} className={className} />;
    }
  }

  return null;
}

export default function MinorCard({
  description,
  date,
  media,
  countMedia,
}: {
  description: unknown;
  date: string;
  media: MediaItem[];
  countMedia: number;
}) {
  const renderMediaByCount = () => {
    if (countMedia === 0) return null;

    const getItem = (index: number, className?: string) => (
      <MediaComponent
        key={index}
        videoUrl={media[index]?.videoUrl}
        imageFile={media[index]?.imageFile}
        className={className}
      />
    );

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
      case 4:
      default:
        return (
          <div className="grid h-[calc(70vh-250px)] grid-cols-2 gap-4 lg:h-[calc(100vh-200px)]">
            {getItem(0, "md:-ml-6 ml-2")}
            {getItem(1)}
            {getItem(2)}
            {getItem(3)}
          </div>
        );
    }
  };

  return (
    <article className="container mx-auto my-16 px-1 md:px-0 ">
      <header>
        <h2 className="mb-4 font-semibold text-2xl lg:text-3xl">
          {new Date(date).toLocaleDateString("uk-UA", {
            month: "long",
            day: "numeric",
          })}
        </h2>
      </header>
      <div className="whitespace-pre-line text-lg lg:text-xl">
        {description ? (
          <PortableText
            value={description as PortableTextBlock[]}
            components={TypographyComponents}
          />
        ) : (
          <p>Текст еще не переведен или не добавлен</p>
        )}
      </div>
      {renderMediaByCount()}
    </article>
  );
}
