"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

import gallery1 from "@/public/img/gallary1.webp";
import gallery2 from "@/public/img/gallary2.webp";
import gallery3 from "@/public/img/gallary3.webp";
import gallery4 from "@/public/img/gallary4.webp";
import gallery5 from "@/public/img/gallary5.webp";
import gallery7 from "@/public/img/gallary7.webp";
import galleryHero from "@/public/img/gallaryHero.webp";

export default function ParallaxGallery() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Анимации
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 7]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 11]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 12]);

  // Изменяем логику появления текста - он появляется только в самом конце
  const textOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  let pictures = [
    {
      src: galleryHero,
      scale: scale4,
      containerClass: "relative w-[14vw] h-[14vh]", // без изменений
    },
    {
      src: gallery1,
      scale: scale5,
      containerClass:
        "relative w-1/2 md:w-[19.6vw] h-[16.8vh] -top-[16.8vh] md:left-[2.8vw] left-1/5",
    },
    {
      src: gallery2,
      scale: scale6,
      containerClass:
        "relative w-[30vw] md:w-[11.2vw] h-[25.2vh] -top-[5.6vh] md:-left-[14vw] -left-[25vw]",
    },
    {
      src: gallery3,
      scale: scale5,
      containerClass:
        "relative w-[40vw] md:w-[14vw] h-[14vh] md:left-[15.4vw] left-[30vw]",
    },
    {
      src: gallery4,
      scale: scale6,
      containerClass:
        "relative w-[31vw] md:w-[11.2vw] h-[14vh] top-[15.4vh] left-[9vw] md:left-[2.8vw]",
    },
    {
      src: gallery5,
      scale: scale8,
      containerClass:
        "relative w-[30vw] md:w-[16.8vw] h-[10vh] md:h-[14vh] top-[13vh] md:top-[15.4vh] md:-left-[12.6vw] right-1/4",
    },
    {
      src: gallery7,
      scale: scale9,
      containerClass:
        "relative w-[16.8vw] md:w-[8.4vw] h-[8.4vh] top-[12.6vh] md:left-[14vw] left-[34vw]",
    },
  ];

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden ">
        {/* Центрированный текст с условной активацией */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="mb-12 font-bold text-base text-static_white lg:text-xl 2xl:text-3xl">
              2019
            </div>
            <div className="px-10 text-center font-accent text-7xl text-static_white lg:px-28 lg:text-8xl xl:text-9xl 2xl:text-10xl">
              Основание хора
            </div>
          </div>
        </motion.div>

        {/* Изображения */}
        {pictures.map(({ src, scale, containerClass }, index) => (
          <motion.div
            key={index}
            style={{ scale }}
            className="absolute top-0 flex h-full w-full items-center justify-center"
          >
            <div className={containerClass}>
              <Image
                src={src}
                alt={`Parallax landscape ${index + 1}`}
                className="pointer-events-none h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                crossOrigin="anonymous"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
