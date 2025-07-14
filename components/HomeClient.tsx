// components/HomeClient.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { TEXT_CONSTANTS } from "@/constants/app-content";

type HomeClientProps = {
  children: React.ReactNode;
  heroImg: any;
  galleryImages: Array<{
    src: any;
    width: number;
    height: number;
    className: string;
  }>;
};

export default function HomeClient({
  heroImg,
  galleryImages,
  children,
}: HomeClientProps) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);
  const additionalTextOpacity = useTransform(scrollY, [0, 150], [0, 1]);

  return (
    <>
      <div className="container relative mx-auto h-[140vh]">
        {/* Изображение в верхнем правом углу */}
        <motion.div style={{ opacity }}>
          <Image
            src={heroImg}
            alt={TEXT_CONSTANTS.ALT_TEXTS.HERO_IMAGE}
            width={188}
            height={250}
            className="absolute top-0 right-0 pt-24"
          />
        </motion.div>

        {/* Sticky заголовок */}
        <div className="sticky inset-1/2 z-10 mb-60 items-center justify-center font-extralight">
          <div className="text-center">
            <h1 className="font-extralight text-4xl uppercase tracking-widest">
              {TEXT_CONSTANTS.HERO_TITLE}
            </h1>
            {/* Дополнительный текст, который появляется при скролле */}
            <motion.div
              style={{ opacity: additionalTextOpacity }}
              className="mt-4"
            >
              <p className="font-extralight text-3xl uppercase tracking-widest">
                {TEXT_CONSTANTS.HERO_SUBTITLE}
              </p>
              <p className="mt-2 font-extralight text-lg uppercase tracking-widest">
                {TEXT_CONSTANTS.AUTHOR}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Текст, который исчезает при скролле */}
        <motion.div
          className="-translate-x-1/2 absolute top-[95vh] left-1/2 font-extralight text-lg uppercase tracking-widest"
          style={{ opacity }}
        >
          {TEXT_CONSTANTS.SCROLL_TEXT}
        </motion.div>
      </div>

      <div className="container relative mx-auto mt-96 h-[155vh]">
        {children}
        <p className="sticky top-0 left-0 h-44 w-96 pt-44 text-start font-extralight text-xl uppercase tracking-widest">
          {TEXT_CONSTANTS.ABOUT_TEXT}
        </p>

        {/* Изображения галереи */}
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            className={image.className}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Image
              src={image.src}
              alt={`${TEXT_CONSTANTS.ALT_TEXTS.GALLERY_IMAGE} ${index + 1}`}
              width={image.width}
              height={image.height}
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}
