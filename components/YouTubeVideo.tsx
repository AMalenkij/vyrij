import { twMerge } from "tailwind-merge";

export default function YouTubeVideo({
  url,
  alt,
  className,
}: {
  url: string;
  alt: string;
  className?: string;
}) {
  return (
    <iframe
      className={twMerge("aspect-video w-full pt-8", className)}
      title={alt}
      src={url}
      allowFullScreen
    />
  );
}
