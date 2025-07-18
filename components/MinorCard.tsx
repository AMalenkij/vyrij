import RenderPhoto from "@/components/RenderPhoto";
import { PortableText } from "@portabletext/react";
import { type PortableTextBlock } from "@portabletext/types";

function MediaItem({
  photoUrl,
  className,
}: {
  photoUrl: string;
  className?: string;
}) {
  if (!photoUrl) return null;
  return <RenderPhoto photoUrl={photoUrl} className={className} />;
}

export default function MinorCard({
  eventsWithMedia,
}: {
  eventsWithMedia: {
    id: string;
    description: PortableTextBlock[];
    date: string;
    photoUrls: (string | null)[];
  };
}) {
  const { date, description, photoUrls } = eventsWithMedia;

  // Фильтруем null значения из photoUrls
  const validPhotoUrls = photoUrls.filter((url) => url !== null);

  const renderPhotosByCount = (photoUrls: string[]) => {
    const count = photoUrls.length;

    if (count === 0) return null;

    switch (count) {
      case 1:
        return <MediaItem photoUrl={photoUrls[0]} />;
      case 2:
        return (
          <div className="grid grid-cols-2 gap-4">
            <MediaItem photoUrl={photoUrls[0]} />
            <MediaItem photoUrl={photoUrls[1]} />
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="-ml-16 md:col-span-2">
              <MediaItem photoUrl={photoUrls[0]} />
            </div>
            <MediaItem photoUrl={photoUrls[1]} />
            <MediaItem photoUrl={photoUrls[2]} />
          </div>
        );
      case 4:
        return (
          <div className="grid h-[calc(70vh-250px)] grid-cols-2 gap-4 lg:h-[calc(100vh-200px)]">
            <MediaItem photoUrl={photoUrls[0]} className="md:-ml-6 ml-2" />
            <MediaItem photoUrl={photoUrls[1]} />
            <MediaItem photoUrl={photoUrls[2]} />
            <MediaItem photoUrl={photoUrls[3]} />
          </div>
        );
      default:
        // Если больше 4 фото, показываем только первые 4
        return (
          <div className="grid h-[calc(70vh-250px)] grid-cols-2 gap-4 lg:h-[calc(100vh-200px)]">
            <MediaItem photoUrl={photoUrls[0]} className="md:-ml-6 ml-2" />
            <MediaItem photoUrl={photoUrls[1]} />
            <MediaItem photoUrl={photoUrls[2]} />
            <MediaItem photoUrl={photoUrls[3]} />
          </div>
        );
    }
  };
  return (
    <article className="container mx-auto my-16">
      <header>
        <h2 className="mb-4 font-semibold text-2xl lg:text-3xl">
          {new Date(date).toLocaleDateString("uk-UA", {
            month: "long",
            day: "numeric",
          })}
        </h2>
      </header>
      <div className="whitespace-pre-line text-lg lg:text-xl">
        <PortableText
          value={description}

          // components={/* optional object of custom components to use */}
        />
      </div>
      {renderPhotosByCount(validPhotoUrls)}
    </article>
  );
}
