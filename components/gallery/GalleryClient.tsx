"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/captions.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Captions from "yet-another-react-lightbox/plugins/captions";
import { AppImage } from "@/adapters/toAppImage";
import NextJsImage from "@/components/gallery/NextJsImage";
import GalleryThumbnail from "@/components/gallery/GalleryThumbnail";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

interface GalleryClientProps {
  items: AppImage[];
}

export default function GalleryClient({ items }: GalleryClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const photoId = searchParams.get("photoId");

  const index = useMemo(
    () => items.findIndex((item) => item.image.id === photoId),
    [items, photoId],
  );

  const open = index !== -1;
  const safeIndex = index >= 0 ? index : 0;

  const slides = useMemo(
    () =>
      items.map((item) => ({
        src: item.image.url,
        alt: item.image.alt,
        width: item.image.dimensions.width,
        height: item.image.dimensions.height,
        blurDataURL: item.image.lqip,
        title: item.image.alt,
      })),
    [items],
  );

  const getPhotoHref = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("photoId", id);
    return `${pathname}?${params.toString()}`;
  };

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("photoId");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSlideChange = (currentIndex: number) => {
    const item = items[currentIndex];
    if (item && item.image.id !== photoId) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("photoId", item.image.id);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <GalleryThumbnail
            key={item.image.id}
            item={item}
            href={getPhotoHref(item.image.id)}
          />
        ))}
      </div>

      {open && (
        <Lightbox
          open={open}
          close={handleClose}
          index={safeIndex}
          slides={slides}
          render={{ slide: NextJsImage }}
          on={{
            view: ({ index: currentIndex }) => handleSlideChange(currentIndex),
          }}
          controller={{ closeOnBackdropClick: true }}
          plugins={[Counter, Thumbnails, Captions]}
          counter={{ container: { style: { top: "unset", bottom: 0 } } }}
        />
      )}
    </div>
  );
}
