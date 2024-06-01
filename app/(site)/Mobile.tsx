import Image from 'next/image'
import Link from 'next/link'

import imgHero from '@/public/img/heroMobile.jpg'
import { QUOTE_TEXT_NEXT, QUOTE_TEXT, AUTOR } from '@/constants/settings'
import Compass from '@/public/svg/Compass'

export default function Mobile() {
  return (
    <div className="block lg:hidden">
      <Image
        src={imgHero}
        height={900}
        alt="Hero img"
        className="object-cover -z-10 -mt-20 "
        quality={100}
      />
      <p className="text-5xl pb-3 text-end pt-5 px-3">{QUOTE_TEXT}</p>
      <p className="text-5xl pb-3 underline decoration-sky-500/30 text-end px-3">{QUOTE_TEXT_NEXT}</p>
      <p className="text-xl text-end px-3">{AUTOR}</p>
      <Link className="text-xl text-center pb-3 absolute bottom-0 inset-x-0 flex items-center justify-center gap-2" href="/timeline" type="button">
        Explore
        <Compass />
      </Link>
    </div>
  )
}
