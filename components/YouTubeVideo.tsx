import { twMerge } from "tailwind-merge";

export default function YouTubeVideo({
  url,
  className,
}: {
  url: string;
  className?: string;
}) {
  return (
    <iframe
      className={twMerge("aspect-video w-full pt-8", className)}
      src={url}
      title="YouTube video player"
      allowFullScreen
    />
  );
}
