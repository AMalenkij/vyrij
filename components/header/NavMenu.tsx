'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'

import { easings } from '@/utils/animations'
import { ROUTES } from '@/constants/settings'
import NavMenuItem from './NavMenuItem'

export default function NavMenu() {
  const pathName = usePathname()
  const routes = useMemo(() => ROUTES(pathName), [pathName])
  return (
    <motion.nav
      className="
      fixed
      h-screen
      w-screen
      bg-popover
      flex
      flex-col
      justify-end
      pb-10
      "
      initial={{ y: '-100%' }}
      animate={{
        y: 0,
        transition: { duration: 1, ease: easings.easeOutQuart },
      }}
      exit={{ y: '-100%', transition: { duration: 0.3 } }}
    >
      <motion.ul exit={{ opacity: 0, transition: { duration: 0 } }}>
        {routes.map((item, idx) => (
          <NavMenuItem
            key={item.label}
            index={idx + 1}
            title={item.label}
            active={item.active}
            href={item.href}
          />
        ))}
      </motion.ul>
    </motion.nav>
  )
}
