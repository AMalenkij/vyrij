/* eslint-disable object-curly-newline */
import Link from 'next/link'

import HeroHeaders from '@/components/HeroHeaders'
import Compass from '@/public/svg/Compass'
import mapDataToHomepageImages from '@/utils/mapDataToHomepageImages'
import { PHOTO_MAIN_DATA, EXPLORE } from '@/constants/settings'
import LinkMainPage from '@/components/LinkMainPage'
import WithMotion from '@/components/withMotion'
import FloatingImageGallery from './FloatingImageGallery'
import Mobile from './Mobile'

export default function Home() {
  const photoMain = mapDataToHomepageImages(PHOTO_MAIN_DATA)
  return (
    <>
      {photoMain
        ? (
          <FloatingImageGallery photoMain={photoMain}>
            <>
              <HeroHeaders />
              <Link href="timeline" className="flex items-center justify-center -mt-40 text-3xl gap-3 lg:hidden" prefetch>
                {EXPLORE}
                <Compass />
              </Link>
              <WithMotion>
                <LinkMainPage text={EXPLORE} Icon={<Compass />} />
              </WithMotion>
            </>
          </FloatingImageGallery>
        )
        : (
          <HeroHeaders />
        )}
      <Mobile />
    </>
  )
}
