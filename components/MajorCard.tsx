"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { YearTitle } from "@/components/YearTitle";
import { PHOTO_SCALE_ANIMATION } from "@/constants/animations";
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
    offset: PHOTO_SCALE_ANIMATION.SCROLL_OFFSET,
  });

  const scaleProgressImg = useTransform(
    scrollYProgress,
    PHOTO_SCALE_ANIMATION.SCALE_RANGE.INPUT,
    PHOTO_SCALE_ANIMATION.SCALE_RANGE.OUTPUT,
  );

  const updateURL = useCallback(() => {
    if (isInView) {
      const currentYear = searchParams.get(YEAR);
      if (currentYear !== year) {
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
        <YearTitle year={year} title={title} />
      </div>
    </div>
  );
}
