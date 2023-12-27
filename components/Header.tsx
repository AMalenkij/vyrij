'use client'

import { twMerge } from 'tailwind-merge'
import { useMemo } from 'react'
import { usePathname } from 'next/dist/client/components/navigation'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import HeaderItem from '@/components/HeaderItem'
import Logo from '@/components/Logo'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import Button from './Button'
import TempBtn from './tempBtn'

interface HeaderProps {
  className?: string
}
export default function Header({ className } : HeaderProps) {
  const authModal = useAuthModal()
  const router = useRouter()

  const supabaseClient = useSupabaseClient()
  const { user } = useUser()

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
      label: 'Choral History',
      active: pathName === '/choralhistory',
      href: '/choralhistory',
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

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut()
    router.refresh()
    if (error) toast.error(error.message)
    else toast.success('Logged out')
  }

  return (
    <header className={twMerge(
      `
    container
    mx-auto
    justify-between
    flex
    items-center
    `,
      className,
    )}
    >
      <Logo>Chor |</Logo>
      <TempBtn>+</TempBtn>
      <div className="flex gap-4">
        {routes.map((items) => (
          <HeaderItem
            key={items.label}
            label={items.label}
            active={items.active}
            href={items.href}
          />
        ))}
        {user ? (
          <div className="flex gap-x-4 items-center">
            <Button
              onClick={handleLogout}
              className="bg-white px-6 py-2"
            >
              Logout
            </Button>
            <Button
              onClick={() => router.push('/account')}
              className="bg-white"
            >
              Logined
            </Button>
          </div>
        ) : (
          <>
            <div>
              <Button
                onClick={authModal.onOpen}
                className="
                    bg-transparent
                    text-neutral-300
                    font-medium
                  "
              >
                Sign up
              </Button>
            </div>
            <div>
              <Button
                onClick={authModal.onOpen}
                className="bg-white px-6 py-2"
              >
                Log in
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
