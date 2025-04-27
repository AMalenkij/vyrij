import Image from 'next/image'

import Logo from '@/components/Logo'
import SVGLogoVyrij from '@/public/svg/LogoVyrij'
import WithMotion from '@/components/withMotion'
import imgHero from '@/public/img/Hero.jpg'

interface HeroHeadersProps {
  heroDescription: string;
  heroSubtitle: string;
  choirName: string;
}

export default function Hero({
  heroDescription,
  heroSubtitle,
  choirName,
}: HeroHeadersProps) {
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
            items-center
            w-56
            h-10
            text-3xl
            mb-36
            whitespace-nowrap
            text-static_white
            mix-blend-difference
          "
          >
            <div className="absolute -left-16 top-16 text-5xl">
              {choirName}
            </div>
            <SVGLogoVyrij />
          </Logo>
          <WithMotion className="text-lg mix-blend-difference text-static_white text-start w-96">
            {heroDescription}
            <br />
            {heroSubtitle}
          </WithMotion>
        </div>
      </div>
    </div>
  )
}
