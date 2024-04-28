import { twMerge } from 'tailwind-merge'
import Link from 'next/link'

import SVGLogoVyrij from '@/public/svg/LogoVyrij'

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
     text-3xl
     rochester-regular
        `,
        className,
      )}
      href="/"
    >
      { children }
      <SVGLogoVyrij />
    </Link>
  )
}
