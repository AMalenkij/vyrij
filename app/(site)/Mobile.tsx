import Image from 'next/image'

import imgHero from '@/public/img/heroMobile.jpg'
import { QUOTE_TEXT_NEXT, QUOTE_TEXT, AUTOR } from '@/constants/settings'

export default function Mobile() {
  return (
    <article className="
    min-h-screen
    p-10
    pointer-events-none
    visible
    lg:invisible
    absolute
    inset-0"
    >
      <Image
        src={imgHero}
        fill
        alt="Hero img"
        className="object-cover -z-10 "
        quality={100}
      />
      <div className="pb-40 pt-44 text-center font-poiretOne text-white">
        <p className="text-6xl pb-3">{QUOTE_TEXT}</p>
        <p className="text-7xl pb-3 underline decoration-sky-500/30">{QUOTE_TEXT_NEXT}</p>
        <p className="text-2xl">{AUTOR}</p>
      </div>
    </article>
  )
}
