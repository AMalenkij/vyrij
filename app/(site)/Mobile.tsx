import Image from 'next/image'
import imgHero from '@/public/img/heroMobile.jpg'
import { HERO_TEXT, QUOTE_TEXT, AUTOR } from '@/constants/settings'

export default function Mobile() {
  return (
    <article className="min-h-screen p-10 pointer-events-none visible lg:invisible absolute inset-0">
      <Image
        src={imgHero}
        fill
        alt="Hero img"
        className="object-cover -z-10"
        quality={100}
      />
      <div className="pb-40 pt-44">
        <p className="text-7xl font-comforter text-white pb-3 text-center">{QUOTE_TEXT}</p>
        <p className="text-xl text-slate-100 pb-3 text-center">{AUTOR}</p>
        <p className="px-2 text-slate-300 text-sm text-center">{HERO_TEXT}</p>
      </div>
    </article>
  )
}
