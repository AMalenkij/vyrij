import HeroHeaders from '@/components/HeroHeaders'
import { type HomepageImages } from '@/types'
import getPhotosMain from '@/actions/getPhotosMain'
import mapDataToHomepageImages from '@/utils/mapDataToHomepageImages'
import ControlledScrollIcon from '@/components/scroll/ControlledScrollIcon'
import useHandleScroll from '@/hooks/useHandleScroll'
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
            <HeroHeaders>
              <ControlledScrollIcon scrollCallback={useHandleScroll} className="top-3/4" />
            </HeroHeaders>
          </FloatingImageGallery>
        )
        : (
          <HeroHeaders>
            <ControlledScrollIcon />
          </HeroHeaders>
        )}
      <Mobile />
    </>
  )
}
