import Link from 'next/link'

import { type HomepageImages } from '@/types'

import HeroHeaders from '@/components/HeroHeaders'
import getPhotosMain from '@/actions/getPhotosMain'
import Compass from '@/public/svg/Compass'
import mapDataToHomepageImages from '@/utils/mapDataToHomepageImages'
import { EXPLORE } from '@/constants/settings'
import FloatingImageGallery from './FloatingImageGallery'
import Mobile from './Mobile'

export default async function Home() {
  const data = await getPhotosMain()
  const photoMain: HomepageImages[] = data ? mapDataToHomepageImages(data) : []
  return (
    <>
      {photoMain
        ? (
          <FloatingImageGallery photoMain={photoMain}>
            <>
              <HeroHeaders />
              <Link href="timeline" className="flex items-center justify-center -mt-40 text-3xl gap-3">
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
