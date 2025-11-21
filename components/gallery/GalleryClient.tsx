"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import "yet-another-react-lightbox/styles.css";
import { AppImage } from "@/adapters/toAppImage";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import NextJsImage from "@/components/gallery/NextJsImage";

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
          <Link
            key={item.image.id}
            href={getPhotoHref(item.image.id)}
            scroll={false}
            className="group relative cursor-pointer overflow-hidden rounded-md border border-card-foreground/60 bg-muted"
          >
            <div className="absolute inset-0 z-10 bg-black/0 transition-colors group-hover:bg-black/20" />

            <Image
              src={item.image.url}
              alt={item.image.alt}
              width={item.image.dimensions.width}
              height={item.image.dimensions.height}
              placeholder="blur"
              blurDataURL={item.image.lqip}
              className="aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          </Link>
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
        />
      )}
    </div>
  );
}
