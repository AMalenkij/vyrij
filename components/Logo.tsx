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
     gap-2
     text-2xl
        `,
      className,
    )}
    >
      { children }
      <SVGLogoVyrij />
    </div>
  )
}
