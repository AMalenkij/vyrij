/* eslint-disable object-curly-newline */
import Link from 'next/link'

import HeroHeaders from '@/components/HeroHeaders'
import Compass from '@/public/svg/Compass'
import mapDataToHomepageImages from '@/utils/mapDataToHomepageImages'
import { EXPLORE, PHOTO_MAIN_DATA } from '@/constants/settings'
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
              <Link href="timeline" className="flex items-center justify-center -mt-40 text-3xl gap-3" prefetch>
                {EXPLORE}
                <Compass />
              </Link>
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
