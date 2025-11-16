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
import toAppImage from "@/adapters/toAppImage";

export default async function Gallery({
  searchParams,
}: {
  searchParams: Promise<{ photoId: string | undefined }>;
}) {
  const t = await getTranslations("Gallery");
  const { photoId } = await searchParams;

  const [photosFetchResult, countFetchResult] = await Promise.all([
    sanityFetch({ query: galleryPhotosQuery }),
    sanityFetch({ query: galleryPhotosCountQuery }),
  ]);

  const rawSanityItems = photosFetchResult.data;
  const unwrappedImages = rawSanityItems.map((item) => item.image);
  const appPhotos = toAppImage(unwrappedImages);

  return (
    <div className="container mx-auto">
      <SubHeader
        title={t("title")}
        counter={countFetchResult.data}
        sectionName={t("sectionName")}
      />
      <main className="mt-20 w-full">
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          {appPhotos.map(({ image }) => (
            <div key={image.id} className="group relative mb-5 w-full">
              <Link
                href={`/gallery?photoId=${image.id}`}
                scroll={false}
                className="block cursor-zoom-in"
              >
                <Image
                  width={image.dimensions.width}
                  height={image.dimensions.height}
                  src={image.url}
                  alt={image.alt}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
                  className="transform rounded-lg transition will-change-auto md:brightness-90 md:group-hover:brightness-110"
                  placeholder={"blur"}
                  blurDataURL={image.lqip}
                />
              </Link>
            </div>
          ))}
        </div>
      </main>
      <GalleryModal images={appPhotos} photoId={photoId} />
    </div>
  );
}
