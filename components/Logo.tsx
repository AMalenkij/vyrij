import { twMerge } from 'tailwind-merge'
import Link from 'next/link'

interface LogoProps {
  children: React.ReactNode
  className?: string
}
export default function Logo({ children, className } : LogoProps) {
  return (
    <Link
      className={twMerge(
        `
     flex
     items-center
     gap-2
     text-xl
     xl:text-3xl
     rochester-regular
     mt-8
     ml-8
     h-10
     shrink-0
     w-28
     lg:w-40
     whitespace-nowrap
     text-white
     fill-white
     lg:text-black
     lg:fill-black
        `,
        className,
      )}
      href="/"
    >
      { children }
    </Link>
  )
}
