import { twMerge } from "tailwind-merge";
import Image from "next/image";

export default function RenderPhoto({
  photoUrl,
  className,
}: {
  photoUrl: string;
  className?: string;
}) {
  return (
    <Image
      width={1000}
      height={900}
      loading="lazy" // Lazy loading
      alt="chor"
      src={photoUrl}
      className={twMerge(
        "h-full w-full object-cover pt-8 lg:max-h-[70vh]",
        className,
      )}
    />
  );
}
