'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ImageWithEffects({
  src,
  alt,
  sizes,
}: { src: string, alt: string, sizes: string }) {
  const [isLoading, setLoading] = useState(true)
  return (
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      fill
      className={`
        duration-700 ease-in-out object-cover
        ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
      `}
      onLoad={() => setLoading(false)}
    />
  )
}
