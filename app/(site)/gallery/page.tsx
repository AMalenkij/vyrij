// import { ClientCldImage } from "@/components/clientCldImage";
// import { GalleryModal } from "@/components/GalleryModal";

import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { galleryPhotosQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import { GalleryModal } from "@/components/GalleryModal";
// import { Badge } from "@/components/ui/badge";

const Gallery = async ({
  searchParams,
}: {
  searchParams: Promise<{ photoId: string | undefined }>;
}) => {
  const { photoId } = await searchParams;
  const { data } = await sanityFetch({ query: galleryPhotosQuery });

  // console.log(data);
  return (
    <div className="container mt-14">
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
                  src={imageUrl}
                  alt="Gallery image"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
                  className="transform rounded-lg transition will-change-auto md:brightness-90 md:group-hover:brightness-110"
                />
                {/* {post?.title_en && (
                  <Badge
                    variant="outline"
                    className="absolute right-3 bottom-4 bg-stone-900/60 text-stone-50"
                  >
                    {post.title_en}
                  </Badge>
                )} */}
              </Link>
            </div>
          ))}
        </div>
      </main>
      {photoId && <GalleryModal images={data} photoId={photoId} />}
    </div>
  );
};

export default Gallery;
