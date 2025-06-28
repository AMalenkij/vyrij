/* eslint-disable max-len */
import { twMerge } from "tailwind-merge";

export default function PageHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      className={twMerge(
        `mt-28 mb-12 text-center font-secondaryFont text-3xl sm:mb-10 sm:text-5xl md:text-6xl lg:mt-36 `,
        className,
      )}
    >
      {children}
    </h2>
  );
}
