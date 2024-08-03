import { twMerge } from 'tailwind-merge'
import Link from 'next/link'

import { HOME_ROUTE } from '@/constants/settings'

interface LogoProps {
  children: React.ReactNode
  className?: string
}
export default function Logo({ children, className } : LogoProps) {
  return (
    <Link
      className={twMerge(
        `
        `,
        className,
      )}
      href={HOME_ROUTE}
    >
      { children }
    </Link>
  )
}
