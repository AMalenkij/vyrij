import Image from 'next/image'
import Link from 'next/link'

import imgHero from '@/public/img/heroMobile.jpg'
import Compass from '@/public/svg/Compass'
import { TIMELINE_ROUTE } from '@/constants/settings'

interface MobileProps {
  quoteStart: string;
  quoteEnd: string;
  author: string;
  explore: string;
}

export default function Mobile({
  quoteStart,
  quoteEnd,
  author,
  explore,
}: MobileProps) {
  return (
    <div className="block lg:hidden">
      <Image
        src={imgHero}
        alt="Hero img"
        className="object-cover -z-10 xs:-mt-24 sm:mt-0 -mt-32"
        placeholder="blur"
        quality={100}
      />
      <p className="text-3xl xs:text-5xl pb-3 text-end pt-5 px-3">{quoteStart}</p>
      <p className="text-3xl xs:text-5xl pb-3 underline decoration-border text-end px-3">{quoteEnd}</p>
      <p className="text-xl text-end px-3">{author}</p>
      <Link
        href={TIMELINE_ROUTE}
        type="button"
        prefetch
        className="text-xl xs:text-2xl text-center pb-12 absolute bottom-0 inset-x-0 flex items-center justify-center gap-2 font-secondaryFont"
      >
        {explore}
        <Compass />
      </Link>
    </div>
  )
}
