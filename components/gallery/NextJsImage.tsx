"use client";

import Image from "next/image";
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
  Slide,
  SlideImage,
} from "yet-another-react-lightbox";

interface NextJsImageSlide extends SlideImage {
  width: number;
  height: number;
  blurDataURL?: string;
}

function isNextJsImage(slide: Slide): slide is NextJsImageSlide {
  return (
    isImageSlide(slide) &&
    typeof slide.width === "number" &&
    typeof slide.height === "number"
  );
}

export default function NextJsImage({
  slide,
  offset,
  rect,
}: {
  slide: Slide;
  offset: number;
  rect: { width: number; height: number };
}) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  if (!isNextJsImage(slide)) return undefined;

  const cover = isImageFitCover(slide, imageFit);

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height) * slide.width),
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width) * slide.height),
      )
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt=""
        src={slide.src}
        loading="eager"
        draggable={false}
        placeholder={slide.blurDataURL ? "blur" : undefined}
        blurDataURL={slide.blurDataURL}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  );
}
