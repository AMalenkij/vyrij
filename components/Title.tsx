/* eslint-disable max-len */
import { twMerge } from 'tailwind-merge'

export default function Title({ className, children } : { className?: string, children: React.ReactNode }) {
  return (
    <h2 className={twMerge(`
      mt-28
      lg:mt-36
      text-3xl
      sm:text-5xl
      md:text-6xl
      text-center
      mb-12
      sm:mb-10
      font-secondaryFont
    `, className)}
    >
      {children}
    </h2>
  )
}
