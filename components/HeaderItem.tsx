import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'

import { blur } from '@/constants/anim'

interface HeaderItemProps {
  index: number;
  label: string;
  active?: boolean;
  href: string;
  selectedRoute: { isActive: boolean; index: number };
  setSelectedRoute: (value: { isActive: boolean; index: number }) => void;
  setClosedMenu: (value: boolean) => void;
  setIsActive: (value: boolean) => void;
}

export default function HeaderItem({
  index,
  label,
  active,
  href,
  selectedRoute,
  setSelectedRoute,
  setIsActive,
  setClosedMenu,
}: HeaderItemProps) {
  return (
    <Link
      href={href}
    >
      <motion.p
        onMouseOver={() => { setSelectedRoute({ isActive: true, index }) }}
        onMouseLeave={() => { setSelectedRoute({ isActive: false, index }) }}
        onClick={() => {
          setIsActive(false)
          setClosedMenu(true)
        }}
        variants={blur}
        animate={selectedRoute.isActive && selectedRoute.index !== index ? 'open' : 'closed'}
        className={twMerge(
          'text-black no-underline uppercase overflow-hidden text-2xl md:text-5xl font-light pt-10 pr-8',
          active && 'text-red-600',
        )}
      >
        {label}
      </motion.p>
    </Link>

  )
}
