"use client";

import { useScroll, useTransform, motion, useInView } from "framer-motion";
import { useRef, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { EVENTS_YEAR_QUERY_ENDPOINT, YEAR } from "@/constants/app-content";
import { YearTitle } from "@/components/YearTitle";

import gallery1 from "@/public/img/gallary1.webp";
import gallery2 from "@/public/img/gallary2.webp";
import gallery3 from "@/public/img/gallary3.webp";
import gallery4 from "@/public/img/gallary4.webp";
import gallery5 from "@/public/img/gallary5.webp";
import gallery7 from "@/public/img/gallary7.webp";
import galleryHero from "@/public/img/gallaryHero.webp";

export default function ParallaxGallery({
  translations,
  year,
}: {
  translations: Record<string, string>;
  year: string;
}) {
  const container = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(textBlockRef, { amount: 0.5 });

  const router = useRouter();
  const searchParams = useSearchParams();

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

  const textOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1]);

  const updateURL = useCallback(() => {
    if (isInView) {
      const currentYear = searchParams.get(YEAR);
      if (currentYear !== year) {
        router.replace(`${EVENTS_YEAR_QUERY_ENDPOINT}${year}`, {
          scroll: false,
        });
      }
    }
  }, [isInView, year, searchParams, router]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  let pictures = [
    {
      index: 0,
      src: galleryHero,
      scale: scale4,
      containerClass: "relative w-[14vw] h-[14vh]",
    },
    {
      index: 1,
      src: gallery1,
      scale: scale5,
      containerClass:
        "relative w-1/2 md:w-[19.6vw] h-[16.8vh] -top-[16.8vh] md:left-[2.8vw] left-1/5",
    },
    {
      index: 2,
      src: gallery2,
      scale: scale6,
      containerClass:
        "relative w-[30vw] md:w-[11.2vw] h-[25.2vh] -top-[5.6vh] md:-left-[14vw] -left-[25vw]",
    },
    {
      index: 3,
      src: gallery3,
      scale: scale5,
      containerClass:
        "relative w-[40vw] md:w-[14vw] h-[14vh] md:left-[15.4vw] left-[30vw]",
    },
    {
      index: 4,
      src: gallery4,
      scale: scale6,
      containerClass:
        "relative w-[31vw] md:w-[11.2vw] h-[14vh] top-[15.4vh] left-[9vw] md:left-[2.8vw]",
    },
    {
      index: 5,
      src: gallery5,
      scale: scale8,
      containerClass:
        "relative w-[30vw] md:w-[16.8vw] h-[10vh] md:h-[14vh] top-[13vh] md:top-[15.4vh] md:-left-[12.6vw] right-1/4",
    },
    {
      index: 6,
      src: gallery7,
      scale: scale9,
      containerClass:
        "relative w-[16.8vw] md:w-[8.4vw] h-[8.4vh] top-[12.6vh] md:left-[14vw] left-[34vw]",
    },
  ];

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Центрированный текст с условной активацией */}
        <motion.div
          id={year}
          ref={textBlockRef}
          style={{ opacity: textOpacity }}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <YearTitle year={year} title={translations.events} />
        </motion.div>

        {/* Изображения */}
        {pictures.map(({ src, scale, containerClass, index }) => (
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
