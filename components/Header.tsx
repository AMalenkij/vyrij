'use client'

import { twMerge } from 'tailwind-merge'
import { useMemo } from 'react'
import { usePathname } from 'next/dist/client/components/navigation'

import HeaderItem from '@/components/HeaderItem'
import Logo from '@/components/Logo'

interface HeaderProps {
  className?: string
}
export default function Header({ className } : HeaderProps) {
  const pathName = usePathname()

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
      href: '/event/2019',
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
    <header className={twMerge(
      `
    mt-6
    container
    mx-auto
    justify-between
    flex
    items-center
    absolute
    top-0
    inset-x-0
    z-50
    `,
      className,
    )}
    >
      <Logo>Chor |</Logo>
      <div className="flex gap-4">
        {routes.map((items) => (
          <HeaderItem
            key={items.label}
            label={items.label}
            active={items.active}
            href={items.href}
          />
        ))}
      </div>
    </header>
  )
}
