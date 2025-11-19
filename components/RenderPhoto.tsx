"use client";

import { twMerge } from "tailwind-merge";
import Image from "next/image";

export default function RenderPhoto({
  photoUrl,
  alt,
  className,
  lqip,
  dimensions,
}: {
  photoUrl: string;
  alt: string;
  className?: string;
  lqip: string;
  dimensions: {
    height: number;
    width: number;
  };
}) {
  return (
    <Image
      width={dimensions.width}
      height={dimensions.height}
      alt={alt}
      src={photoUrl}
      className={twMerge(
        "h-full w-full object-cover opacity-0 duration-700 ease-in-out lg:max-h-[70vh]",
        className,
      )}
      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
      placeholder={"blur"}
      blurDataURL={lqip}
      onLoadingComplete={(img) => {
        img.classList.remove("opacity-0");
        img.classList.add("opacity-100");
      }}
    />
  );
}
