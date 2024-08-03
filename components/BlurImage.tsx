'use client'

import { twMerge } from 'tailwind-merge'
import Image from 'next/image'
import { useState } from 'react'

import { SUPABASE_STORAGE_URL } from '@/constants/settings'
import { Photos } from '@/types'

export default function BlurImage({ image }: { image: Photos }) {
  const [isLoading, setLoading] = useState(true)

  return (
    <a href={`${SUPABASE_STORAGE_URL}${image.href}`} className="group">
      <div className="aspect-square xl:aspect-7/8 relative overflow-hidden rounded-lg bg-accent">
        <Image
          alt="choir photos"
          src={`${SUPABASE_STORAGE_URL}${image.href}`}
          fill
          className={twMerge(
            'duration-700 ease-in-out group-hover:opacity-75 object-cover',
            isLoading
              ? 'scale-110 blur-2xl grayscale'
              : 'scale-100 blur-0 grayscale-0',
          )}
          onLoad={() => setLoading(false)}
        />
      </div>
    </a>
  )
}
