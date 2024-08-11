import Image from 'next/image'
import Link from 'next/link'

import imgHero from '@/public/img/heroMobile.jpg'
import {
  QUOTE_TEXT_NEXT, QUOTE_TEXT, AUTOR, EXPLORE, TIMELINE_ROUTE,
} from '@/constants/settings'
import Compass from '@/public/svg/Compass'

export default function Mobile() {
  return (
    <div className="block lg:hidden">
      <Image
        src={imgHero}
        alt="Hero img"
        className="object-cover -z-10 xs:-mt-24 sm:mt-0 -mt-32"
        placeholder="blur"
        quality={100}
      />
      <p className="text-3xl xs:text-5xl pb-3 text-end pt-5 px-3">{QUOTE_TEXT}</p>
      <p className="text-3xl xs:text-5xl pb-3 underline decoration-border text-end px-3">{QUOTE_TEXT_NEXT}</p>
      <p className="text-xl text-end px-3">{AUTOR}</p>
      <Link
        href={TIMELINE_ROUTE}
        type="button"
        prefetch
        className="text-xl xs:text-2xl text-center pb-12 absolute bottom-0 inset-x-0 flex items-center justify-center gap-2 font-secondaryFont"
      >
        {EXPLORE}
        <Compass />
      </Link>
    </div>
  )
}
