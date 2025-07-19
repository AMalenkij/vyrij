"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TEXT_CONSTANTS } from "@/constants/app-content";

type HomeClientProps = {
  // children: React.ReactNode;
  galleryImages: Array<{
    src: any;
    width: number;
    height: number;
    className: string;
  }>;
};

export default function HomeClient({
  galleryImages,
  // children,
}: HomeClientProps) {
  return (
    <>
      <div className="container relative mx-auto mt-96 h-[155vh]">
        <p className="sticky top-0 left-0 h-44 w-96 pt-96 pb-196 text-start font-extralight text-xl uppercase tracking-widest lg:pt-40">
          {TEXT_CONSTANTS.ABOUT_TEXT}
        </p>
        {/* Изображения галереи */}
        {galleryImages.map((image, index) => (
          //to do: motion надо будет выснести в отдельный компонент
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
