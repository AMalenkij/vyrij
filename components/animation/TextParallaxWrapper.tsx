"use client";
import { motion, MotionValue } from "framer-motion";
import { useTransform } from "framer-motion";
import { ReactNode, RefObject, forwardRef } from "react";
import { PARALLAX_GALLERY } from "@/constants/animations";

type TextParallaxWrapperProps = {
  children: ReactNode;
  scrollYProgress: MotionValue<number>;
  className?: string;
};

const TextParallaxWrapper = forwardRef<
  HTMLDivElement,
  TextParallaxWrapperProps
>(
  (
    {
      children,
      scrollYProgress,
      className = "absolute inset-0 z-10 flex items-center justify-center",
    },
    ref,
  ) => {
    const textOpacity = useTransform(
      scrollYProgress,
      PARALLAX_GALLERY.TEXT_OPACITY.RANGE,
      PARALLAX_GALLERY.TEXT_OPACITY.VALUES,
    );

    return (
      <motion.div
        ref={ref}
        style={{ opacity: textOpacity }}
        className={className}
      >
        {children}
      </motion.div>
    );
  },
);

TextParallaxWrapper.displayName = "TextParallaxWrapper";

export default TextParallaxWrapper;
