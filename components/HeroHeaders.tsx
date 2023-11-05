import { twMerge } from 'tailwind-merge'
import Image from 'next/image'

import Button from '@/components/Button'
import getPhotos from '@/actions/getPhotos'
import { HERO_TEXT, QUOTE_TEXT, supabaseStorageURL } from '@/constants/settings'

interface HeroHeadersProps {
  className?: string
}
const time = 'Mar 10, 2020'
const fish = 'Boost your conversion rate'

export default async function HeroHeaders({ className } : HeroHeadersProps) {
  const photos = await getPhotos(1)

  return (
    <div className={twMerge(
      `
     relative
     flex
     w-1/2
        `,
      className,
    )}
    >
      {photos.map((photo) => (
        <Image
          key={photo.photo_id}
          src={`${supabaseStorageURL}${photo.href}`}
          width={600}
          height={600}
          alt="Hero img"
        />
      ))}

      <article className="flex flex-col justify-end p-4">
        <time>{time}</time>
        <h2>{fish}</h2>
        <p className="line-clamp-3">{HERO_TEXT}</p>
        <Button>
          Explore
        </Button>
      </article>
      <article className="absolute t-0 left-1/4">
        <p className="text-4xl text-orange-500">{QUOTE_TEXT}</p>
      </article>
    </div>
  )
}
