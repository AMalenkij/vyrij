"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode, useCallback, useEffect, useRef } from "react";

import { EVENTS_YEAR_QUERY_ENDPOINT, YEAR } from "@/constants/app-content";

type MajorCardProps = {
  year: string;
  title: string;
  children: ReactNode;
};

export default function MajorCard({ year, title, children }: MajorCardProps) {
  const refFM = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInView = useInView(refFM, { amount: 0.5 });

  const { scrollYProgress } = useScroll({
    target: refFM,
    offset: ["start end", "end start"],
  });

  const scaleProgressImg = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  const updateURL = useCallback(() => {
    if (isInView) {
      const currentYear = searchParams.get(YEAR);
      if (currentYear !== year.toString()) {
        const newUrl = `${EVENTS_YEAR_QUERY_ENDPOINT}${year}`;
        router.replace(newUrl, { scroll: false });
      }
    }
  }, [isInView, year, searchParams, router]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  return (
    <div className="relative h-[200vh]" id={year.toString()} ref={refFM}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="relative h-full w-full"
          style={{ scale: scaleProgressImg }}
        >
          {children}
        </motion.div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="mb-12 font-bold text-base text-static_white lg:text-xl 2xl:text-3xl">
            {year}
          </div>
          <div className="px-10 text-center font-secondaryFont text-7xl text-static_white lg:px-28 lg:text-8xl xl:text-9xl 2xl:text-10xl">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
}
