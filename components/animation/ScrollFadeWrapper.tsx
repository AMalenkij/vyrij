"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode } from "react";
import { SCROLL_RANGES } from "@/constants/animations";

type ScrollRange =
  | typeof SCROLL_RANGES.HERO_FADE
  | typeof SCROLL_RANGES.DEFAULT;

type ScrollFadeWrapperProps = {
  children: ReactNode;
  fadeOut?: boolean;
  scrollRange?: ScrollRange;
  className?: string;
};

export function ScrollFadeWrapper({
  children,
  fadeOut = false,
  scrollRange = SCROLL_RANGES.HERO_FADE,
  className,
}: ScrollFadeWrapperProps) {
  const { scrollY } = useScroll();
  const opacity = useTransform(
    scrollY,
    scrollRange.INPUT,
    fadeOut ? scrollRange.OUTPUT_FADE : scrollRange.OUTPUT_REVEAL,
  );

  return (
    <motion.div style={{ opacity }} className={className}>
      {children}
    </motion.div>
  );
}
