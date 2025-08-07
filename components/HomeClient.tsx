import Image from "next/image";
import { GALLERY_IMAGES } from "@/constants/app-content";
import MotionWrapper from "@/components/MotionWrapper";

export default function HomeClient({
  translations,
}: {
  translations: Record<string, string>;
}) {
  return (
    <div className="container relative mx-auto mt-96 h-[155vh]">
      <p className="top-0 left-0 h-44 text-start font-extralight text-xl uppercase tracking-widest md:sticky md:w-96 md:pt-96 md:pb-196 lg:pt-40">
        {translations.aboutText}
      </p>

      {/* Изображения галереи */}
      {GALLERY_IMAGES.map(({ src, index, width, height, className }) => (
        <MotionWrapper key={index} className={className} index={index}>
          <Image
            src={src}
            alt={`${translations.galleryImage} ${index + 1}`}
            width={width}
            height={height}
            loading="lazy"
          />
        </MotionWrapper>
      ))}
    </div>
  );
}
