'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import { usePathname } from 'next/dist/client/components/navigation'
import { motion, AnimatePresence } from 'framer-motion'

import {
  opacity,
  background,
  translate,
  height,
  scale,
} from '@/constants/anim'
import Logo from '@/components/Logo'
import HeaderItem from '@/components/HeaderItem'

function Footer() {
  return (
    <div className="flex items-end flex-wrap text-sm uppercase text-gray-500 mt-40">
      <ul className="w-full md:w-1/2 mt-10 overflow-hidden list-none p-0">
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          className="mb-2"
        >
          <span className="text-gray-600">Made by:</span>
          Studio Lumio
        </motion.li>
      </ul>
      <ul className="w-full md:w-1/2 mt-10 overflow-hidden list-none p-0">
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          className="mb-2"
        >
          <span className="text-gray-600">Typography:</span>
          {' '}
          Google Fonts
        </motion.li>
      </ul>
      <ul className="w-full md:w-1/2 mt-10 overflow-hidden list-none p-0">
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          className="mb-2"
        >
          <span className="text-gray-600">Images:</span>
          {' '}
          Freepik, Envato
        </motion.li>
      </ul>
      <ul className="w-full md:w-auto mt-10 overflow-hidden list-none p-0">
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          className="mb-2"
        >
          Privacy Policy
        </motion.li>
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          className="mb-2 "
        >
          Terms & Conditions
        </motion.li>
      </ul>
    </div>
  )
}
function Nav({ setIsActive, setClosedMenu }) {
  const pathName = usePathname()

  const [selectedRoute, setSelectedRoute] = useState({ isActive: false, index: 0 })
  const routes = useMemo(() => [
    {
      label: 'Home',
      active: pathName === '/',
      href: '/',
    },
    {
      label: 'Time Line',
      active: pathName === '/timeline',
      href: '/timeline',
    },
    {
      label: 'Event',
      active: pathName === '/event',
      href: '/event',
    },
    {
      label: 'Concerts',
      active: pathName === '/concerts',
      href: '/concerts',
    },
    {
      label: 'Gallery',
      active: pathName === '/gallery',
      href: '/gallery',
    },
  ], [pathName])

  return (
    <motion.div variants={height} initial="initial" animate="enter" exit="exit" className="overflow-hidden">
      <div className="flex gap-8 mb-20 md:mb-0">
        <div className=" flex-col justify-between md:flex-row">
          <div className="flex flex-wrap mt-40">
            {routes.map((route, index) => (
              <HeaderItem
                key={route.label}
                index={index}
                label={route.label}
                active={route.active}
                href={route.href}
                selectedRoute={selectedRoute}
                setSelectedRoute={setSelectedRoute}
                setClosedMenu={setClosedMenu}
                setIsActive={setIsActive}
              />
            ))}
          </div>
          <Footer />
        </div>
      </div>
    </motion.div>

  )
}
export default function NavigationMenu() {
  const [isActive, setIsActive] = useState(false)
  const [closedMenu, setClosedMenu] = useState(false)

  return (
    <div className="w-full box-border p-6 ">
      <div className="relative flex justify-between text-uppercase text-sm font-semibold px-10">
        <Link href="/">
          <motion.div variants={scale} animate={!isActive ? 'open' : 'closed'}>
            <Logo>Chor |</Logo>
          </motion.div>
        </Link>
        <button type="button" onClick={() => { setIsActive(!isActive), setClosedMenu(false) }} className="flex items-center justify-center gap-8 cursor-pointer">
          <div className={`burger ${isActive ? 'burgerActive' : ''}`} />
          <div className="relative flex items-center ">
            <motion.p className="absolute opacity-0" variants={opacity} animate={!isActive ? 'open' : 'closed'}>Menu</motion.p>
            <motion.p className="absolute opacity-0" variants={opacity} animate={isActive ? 'open' : 'closed'}>Close</motion.p>
          </div>
        </button>
      </div>
      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? 'open' : 'closed'}
        className="absolute left-0 top-full w-full h-full bg-black opacity-50"
      />
      {!closedMenu
             && (
             <AnimatePresence mode="wait">
               {isActive && (
               <Nav
                 setClosedMenu={setClosedMenu}
                 setIsActive={setIsActive}
               />
               )}
             </AnimatePresence>
             )}

    </div>
  )
}
