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
    fixed 
    top-10
    left-8
     flex
     items-center
     gap-2
     text-xl
     xl:text-3xl
     rochester-regular
     h-10
     shrink-0
     w-28
     lg:w-44
     whitespace-nowrap
     text-white
     mix-blend-difference
     z-50
        `,
        className,
      )}
      href="/"
    >
      { children }
    </Link>
  )
}
