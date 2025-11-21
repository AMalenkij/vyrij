import toAppImage from "@/adapters/toAppImage";
import { sanityFetch } from "@/sanity/lib/live";
import {
  galleryPhotosCountQuery,
  galleryPhotosQuery,
} from "@/sanity/lib/queries";
import GalleryClient from "@/components/gallery/GalleryClient";
import { getTranslations } from "next-intl/server";
import SubHeader from "@/components/SubHeader";
import { Suspense } from "react";

export default async function Gallery() {
  const [photosFetchResult, countFetchResult] = await Promise.all([
    sanityFetch({ query: galleryPhotosQuery }),
    sanityFetch({ query: galleryPhotosCountQuery }),
  ]);
  const t = await getTranslations("Gallery");
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
      <Suspense
        fallback={
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            Loading...
          </div>
        }
      >
        <GalleryClient items={appPhotos} />
      </Suspense>
    </div>
  );
}
