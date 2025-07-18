"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function WithViewportAnimation({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut", duration: 1 }}
      viewport={{ once: false }}
    >
      {children}
    </motion.div>
  );
}
