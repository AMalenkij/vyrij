"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
// import { ClientCldImage } from "./clientCldImage";
import { useRouter } from "next/navigation";
import { ExternalLink, ImageDown } from "lucide-react";
import { Button } from "./ui/button";
// import downloadPhoto from "@/utils/downloadPhoto";

export function GalleryModal({
  images,
  photoId,
}: {
  images: Array<{ _id: string; imageUrl: string }>;
  photoId?: string;
}) {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [mainApi, setMainApi] = React.useState<CarouselApi>();
  const [thumbsApi, setThumbsApi] = React.useState<CarouselApi>();

  // Инициализация начального индекса
  const initialIndex = React.useMemo(
    () => (photoId ? images.findIndex((img) => img._id === photoId) : 0),
    [photoId, images],
  );

  // Обработчик клика по миниатюре
  const onThumbClick = React.useCallback(
    (index: number) => {
      if (!mainApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi],
  );

  // Инициализация индекса при монтировании
  React.useEffect(() => {
    if (mainApi) {
      mainApi.scrollTo(initialIndex);
      setSelectedIndex(initialIndex);
    }
  }, [mainApi, initialIndex]);
  // Синхронизация каруселей
  React.useEffect(() => {
    if (!mainApi || !thumbsApi) return;

    const updateIndex = () => {
      const newIndex = mainApi.selectedScrollSnap();
      setSelectedIndex(newIndex);
      thumbsApi.scrollTo(newIndex);
    };

    mainApi.on("select", updateIndex);

    // Явное указание типа возвращаемой функции очистки
    return () => {
      mainApi.off("select", updateIndex);
    };
  }, [mainApi, thumbsApi]);
  return (
    <Dialog
      open={!!photoId}
      onOpenChange={(open) => !open && router.push("/gallery")}
    >
      <DialogTitle className="sr-only">Photo</DialogTitle>
      <DialogContent className="border-0 bg-black/30 p-2 [&_button_svg]:h-10 [&_button_svg]:w-10 w-[1200px] ">
        {/* Основная карусель */}
        <Carousel setApi={setMainApi} opts={{ startIndex: initialIndex }}>
          <CarouselContent className="">
            {images.map((image) => (
              <CarouselItem key={image._id} className="">
                <div className="relative flex aspect-[3/2] items-center justify-center">
                  <Image
                    fill
                    src={image.imageUrl}
                    alt="Gallery image"
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>
                {/* Main image */}
                {/* <div className="w-full overflow-hidden">
                  <div className="relative flex aspect-[3/2] items-center justify-center">
                    <Image
                      src={image.imageUrl}
                      fill
                      priority
                      alt="Next.js Conf image"
                      // onLoad={() => setLoaded(true)}
                      className="object-cover"
                    />
                  </div>
                </div> */}
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute top-1/2 flex w-full items-center justify-between px-3">
            <CarouselPrevious />
            <CarouselNext />
          </div>
          <div className="absolute top-4 left-4 flex gap-x-4">
            {/* <Button variant="outline">
              <a
                href={`https://res.cloudinary.com/djpoy5xco/image/upload/${images[selectedIndex].publicId}.jpg`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open full size in new tab"
                className="text-stone-50"
              >
                <ExternalLink />
                <span className="sr-only">Open in new tab</span>
              </a>
            </Button> */}
            {/* <Button
              variant="outline"
              className="text-stone-50"
              onClick={() => {
                downloadPhoto(
                  `https://res.cloudinary.com/djpoy5xco/image/upload/${images[selectedIndex].publicId}.jpg`,
                  `${images[selectedIndex].publicId}.jpg`,
                );
              }}
            >
              <ImageDown />
              <span className="sr-only">Download image</span>
            </Button> */}
          </div>
        </Carousel>

        {/* Карусель миниатюр */}
        <Carousel
          setApi={setThumbsApi}
          opts={{
            containScroll: "keepSnaps",
            dragFree: true,
            startIndex: initialIndex,
            align: "center",
          }}
        >
          <CarouselContent className="absolute">
            {images.map((image, index) => (
              <CarouselItem key={image._id} className="basis-1/6">
                <button
                  type="button" // Добавлен явный тип
                  onClick={() => onThumbClick(index)}
                  className={`overflow-hidden transition-all${
                    selectedIndex === index
                      ? "scale-110"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    width="140"
                    height="80"
                    src={image.imageUrl}
                    alt={`Thumbnail ${index + 1}`}
                    className="object-cover"
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
