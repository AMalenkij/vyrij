"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero({
  children,
  translations,
}: {
  children: React.ReactNode;
  translations: Record<string, string>;
}) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 150], [1, 0]);
  const additionalTextOpacity = useTransform(scrollY, [0, 150], [0, 1]);

  return (
    <div className="container relative mx-auto h-screen">
      <motion.div style={{ opacity }}>{children}</motion.div>

      <div className="sticky inset-1/2 z-10 mb-60 items-center justify-center font-extralight">
        <div className="text-center">
          <h1 className="font-extralight text-xl uppercase tracking-widest md:text-2xl lg:text-3xl xl:text-4xl">
            {translations.title}
          </h1>
          <motion.div
            style={{ opacity: additionalTextOpacity }}
            className="mt-4"
          >
            <p className="font-extralight uppercase tracking-widest md:text-xl lg:text-2xl xl:text-3xl">
              {translations.subtitle}
            </p>
            <p className="mt-2 font-extralight text-sm uppercase tracking-widest lg:text-base xl:text-lg">
              {translations.author}
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="-translate-x-1/2 absolute top-[80%] left-1/2 font-extralight text-xs uppercase md:tracking-widest lg:text-base xl:text-lg"
        style={{ opacity }}
      >
        {"{ "}
        {translations.scrollText}
        {" }"}
      </motion.div>
    </div>
  );
}
