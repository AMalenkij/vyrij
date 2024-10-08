/* eslint-disable max-len */
import { twMerge } from 'tailwind-merge'
import Image from 'next/image'

export default function RenderPhoto({ photoUrl, className }: { photoUrl: string, className?: string }) {
  return (
    <Image
      width={1000}
      height={1000}
      loading="lazy" // Lazy loading
      alt="chor"
      src={photoUrl}
      className={twMerge('object-cover  lg:max-h-[70vh] w-full h-full pt-8', className)}
    />
  )
}
