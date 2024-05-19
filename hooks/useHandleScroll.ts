'use client'

import { scroll } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function useHandleScroll() {
  const router = useRouter()
  useEffect(() => {
    const unsubscribe = scroll((progress) => {
      if (progress === 1) router.push('/timeline')
    })

    return () => {
      unsubscribe()
    }
  }, [router])
}
