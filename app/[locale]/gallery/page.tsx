import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { sanityFetch } from "@/sanity/lib/live";
import {
  galleryPhotosQuery,
  galleryPhotosCountQuery,
} from "@/sanity/lib/queries";
import { GalleryModal } from "@/components/GalleryModal";
import SubHeader from "@/components/SubHeader";

export default async function Gallery({
  searchParams,
}: {
  searchParams: Promise<{ photoId: string | undefined }>;
}) {
  const t = await getTranslations("Gallery");
  const { photoId } = await searchParams;

  const [photosResult, countResult] = await Promise.all([
    sanityFetch({ query: galleryPhotosQuery }),
    sanityFetch({ query: galleryPhotosCountQuery }),
  ]);

  return (
    <div className="container mx-auto">
      <SubHeader
        title={t("title")}
        counter={countResult.data}
        sectionName={t("sectionName")}
      />
      <main className="mt-20 w-full">
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          {photosResult.data.map(
            ({ imageUrl, title, _id, lqip, dimensions }) =>
              imageUrl &&
              dimensions && (
                <div key={_id} className="group relative mb-5 w-full">
                  <Link
                    href={`/gallery?photoId=${_id}`}
                    scroll={false}
                    className="block cursor-zoom-in"
                  >
                    <Image
                      width={dimensions.width}
                      height={dimensions.height}
                      src={imageUrl}
                      alt={title || t("imageAlt")}
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
                      className="transform rounded-lg transition will-change-auto md:brightness-90 md:group-hover:brightness-110"
                      placeholder={lqip ? "blur" : "empty"}
                      blurDataURL={lqip ?? undefined}
                    />
                  </Link>
                </div>
              ),
          )}
        </div>
      </main>
      <GalleryModal images={photosResult.data} photoId={photoId} />
    </div>
  );
}
