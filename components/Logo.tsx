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
        `,
        className,
      )}
      href="/"
    >
      { children }
    </Link>
  )
}
