import { twMerge } from 'tailwind-merge'
import Image from 'next/image'

import { supabaseStorageURL } from '@/constants/settings'

export default function RenderPhotos({
  photos,
  startFromIndex = 0,
  limit = 6,
  className,
}: {
  photos: { href: string }[];
  startFromIndex?: number;
  limit?: number;
  className: string;
}): JSX.Element[] {
  return photos
    .slice(startFromIndex, startFromIndex + limit)
    .map((photo) => (
      <Image
        key={photo.href}
        width={1000}
        height={1000}
        loading="lazy" // Lazy loading
        alt="chor"
        src={photo.href ? `${supabaseStorageURL}${photo.href}` : ''}
        className={twMerge(`
            object-cover
          `, className)}
      />
    ))
}
