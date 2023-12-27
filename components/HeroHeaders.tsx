import { twMerge } from 'tailwind-merge'
import Image from 'next/image'

import Button from '@/components/Button'
import floating8 from '@/public/images/floating_8.jpg'
import { HERO_TEXT, QUOTE_TEXT } from '@/constants/settings'

interface HeroHeadersProps {
  className?: string
}
const time = 'Mar 10, 2020'
const fish = 'Boost your conversion rate'

export default function HeroHeaders({ className } : HeroHeadersProps) {
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

      <Image
        src={floating8}
        width={600}
        height={600}
        alt="Hero img"
      />

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
