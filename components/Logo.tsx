import { twMerge } from 'tailwind-merge'

import SVGLogoVyrij from '@/public/svg/LogoVyrij'

interface LogoProps {
  children: React.ReactNode
  className?: string
}
export default function Logo({ children, className } : LogoProps) {
  return (
    <div className={twMerge(
      `
     flex
     items-center
     gap-3
     text-5xl
        `,
      className,
    )}
    >
      { children }
      <SVGLogoVyrij />
    </div>
  )
}
