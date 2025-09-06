"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { PHOTO_ANIMATION, DELAY } from "@/constants/animations";

type PhotoScrollWrapperProps = {
  children: ReactNode;
  className?: string;
  index?: number;
  once?: boolean;
};

export default function PhotoScrollWrapper({
  children,
  className,
  index = 0,
  once = true,
}: PhotoScrollWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: PHOTO_ANIMATION.INITIAL.OPACITY,
        y: PHOTO_ANIMATION.INITIAL.Y,
        filter: PHOTO_ANIMATION.INITIAL.BLUR,
      }}
      whileInView={{
        opacity: PHOTO_ANIMATION.ANIMATE.OPACITY,
        y: PHOTO_ANIMATION.ANIMATE.Y,
        filter: PHOTO_ANIMATION.ANIMATE.BLUR,
      }}
      transition={{
        duration: PHOTO_ANIMATION.TRANSITION.DURATION,
        ease: PHOTO_ANIMATION.TRANSITION.EASE,
        delay: index * DELAY.STAGGER,
      }}
      viewport={{
        once,
        amount: PHOTO_ANIMATION.VIEWPORT.AMOUNT,
      }}
    >
      {children}
    </motion.div>
  );
}
