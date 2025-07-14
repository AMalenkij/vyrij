"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { TEXT_CONSTANTS } from "@/constants/app-content";

export default function Hero({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 150], [1, 0]);
  const additionalTextOpacity = useTransform(scrollY, [0, 150], [0, 1]);

  return (
    <div className="container relative mx-auto h-screen ">
      {/* Изображение в верхнем правом углу */}
      <motion.div style={{ opacity }}>{children}</motion.div>

      {/* Sticky заголовок */}
      <div className="sticky inset-1/2 z-10 mb-60 items-center justify-center font-extralight">
        <div className="text-center">
          <h1 className="font-extralight text-2xl uppercase tracking-widest xl:text-4xl">
            {TEXT_CONSTANTS.HERO_TITLE}
          </h1>
          {/* Дополнительный текст, который появляется при скролле */}
          <motion.div
            style={{ opacity: additionalTextOpacity }}
            className="mt-4"
          >
            <p className="font-extralight text-xl uppercase tracking-widest lg:text-3xl">
              {TEXT_CONSTANTS.HERO_SUBTITLE}
            </p>
            <p className="mt-2 font-extralight uppercase tracking-widest lg:text-lg">
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
  );
}
