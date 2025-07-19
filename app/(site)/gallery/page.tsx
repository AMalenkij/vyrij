import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { galleryPhotosQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import { GalleryModal } from "@/components/GalleryModal";

const Gallery = async ({
  searchParams,
}: {
  searchParams: Promise<{ photoId: string | undefined }>;
}) => {
  const { photoId } = await searchParams;
  const { data } = await sanityFetch({ query: galleryPhotosQuery });

  // Filter out items where imageUrl is null and assert the type
  // Надстройка для прохождения тпизации
  const filteredData = data.filter(
    (photo): photo is { _id: string; imageUrl: string } =>
      photo.imageUrl !== null,
  );

  return (
    <div className="container mx-auto mt-14">
      <main className="mt-20 w-full max-w-[1960px]">
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          {data.map(({ imageUrl, _id }) => (
            <div key={_id} className="group relative mb-5 w-full">
              <Link
                href={`/gallery?photoId=${_id}`}
                scroll={false}
                className="block cursor-zoom-in"
              >
                <Image
                  width={720}
                  height={480}
                  src={imageUrl || ""}
                  alt="Gallery image"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
                  className="transform rounded-lg transition will-change-auto md:brightness-90 md:group-hover:brightness-110"
                />
              </Link>
            </div>
          ))}
        </div>
      </main>
      {photoId && <GalleryModal images={filteredData} photoId={photoId} />}
    </div>
  );
};

export default Gallery;
