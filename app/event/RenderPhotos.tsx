import { twMerge } from 'tailwind-merge'

import { ChorusChronicles as ChorusChroniclesProps } from '@/types'
import { supabaseStorageURL } from '@/constants/settings'

export default function RenderPhotos({
  photos,
  startFromIndex = 0,
  limit = 6,
  className,
}: ChorusChroniclesProps & { className: string }): JSX.Element[] {
  return photos
    .slice(startFromIndex, startFromIndex + limit)
    .map((photo) => (
      <img
        key={photo.href}
        alt="chor"
        src={`${supabaseStorageURL}${photo.href}`}
        className={twMerge(`
            w-1/3
            object-cover
          `, className)}
      />
    ))
}
