import Link from 'next/link'

import HeroHeaders from '@/components/HeroHeaders'
import { type HomepageImages } from '@/types'
import getPhotosMain from '@/actions/getPhotosMain'
import mapDataToHomepageImages from '@/utils/mapDataToHomepageImages'
import Compass from '@/public/svg/Compass'
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
                Explore
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
