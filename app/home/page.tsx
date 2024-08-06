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
      <FloatingImageGallery photoMain={photoMain}>
        <>
          <HeroHeaders />
          <WithMotion>
            <LinkMainPage text={EXPLORE} Icon={<Compass />} />
          </WithMotion>
        </>
      </FloatingImageGallery>
      <Mobile />
    </>
  )
}
