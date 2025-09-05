import Image from "next/image";
import { GALLERY_IMAGES } from "@/constants/app-content";
import PhotoScrollWrapper from "@/components/animation/PhotoScrollWrapper";

export default function HomeClient({
  translations,
}: {
  translations: Record<string, string>;
}) {
  return (
    <div className="container relative mx-auto h-[260vh] lg:h-[240vh]">
      <p className="top-0 left-0 h-44 px-3 text-start font-extralight uppercase tracking-widest lg:sticky lg:w-96 lg:pt-96 lg:pb-196 lg:text-xl">
        {translations.aboutText}
      </p>
      <div className="relative top-[5vh] lg:static">
        {/* Изображения галереи */}
        {GALLERY_IMAGES.map(({ src, index, width, height, className }) => (
          <PhotoScrollWrapper key={index} className={className} index={index}>
            <Image
              src={src}
              alt={`${translations.galleryImage} ${index + 1}`}
              width={width}
              height={height}
              loading="lazy"
            />
          </PhotoScrollWrapper>
        ))}
      </div>
    </div>
  );
}
