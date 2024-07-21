/* eslint-disable max-len */
import { twMerge } from 'tailwind-merge'

export default function Title({ className, children } : { className?: string, children: React.ReactNode }) {
  return (
    <h2 className={twMerge(`
      text-lg
      sm:text-2xl
      md:text-3xl
      text-center
      my-2
    `, className)}
    >
      {children}
    </h2>
  )
}
