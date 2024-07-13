import Image from 'next/image'

import { HERO_TEXT, HERO_TEXT_END, CHOR } from '@/constants/settings'
import Logo from '@/components/Logo'
import SVGLogoVyrij from '@/public/svg/LogoVyrij'
import WithMotion from '@/components/withMotion'
import imgHero from '@/public/img/Hero.jpg'

export default function HeroHeaders() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div className="flex justify-center w-screen gap-4">
        <Image
          src={imgHero}
          height={500}
          alt="Hero img"
          className="object-cover"
          quality={100}
        />
        <div>
          <Logo className="
        relative
        -left-10
        top-10
        flex
      text-white
        mix-blend-difference
        items-center
        w-56
        h-10
        text-3xl
        whitespace-nowrap
        mb-36
        "
          >
            <div className="absolute -left-16 top-16 text-5xl">{CHOR}</div>
            <SVGLogoVyrij />
          </Logo>
          <WithMotion className="text-lg mix-blend-difference text-white text-start w-96">
            {HERO_TEXT}
            <br />
            {HERO_TEXT_END}
          </WithMotion>
        </div>
      </div>
    </div>
  )
}
