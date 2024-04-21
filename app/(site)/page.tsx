import HeroHeaders from '@/components/HeroHeaders'
import { type HomepageImages } from '@/types'
import getPhotosMain from '@/actions/getPhotosMain'
import mapDataToHomepageImages from '@/utils/mapDataToHomepageImages'
import FloatingImageGallery from './FloatingImageGallery'
import Mobile from './Mobile'

export default async function Home() {
  const data = await getPhotosMain()
  const photoMain: HomepageImages[] = data ? mapDataToHomepageImages(data) : []
  return (
    <>
      {photoMain
        ? <FloatingImageGallery photoMain={photoMain}><HeroHeaders /></FloatingImageGallery>
        : <HeroHeaders />}
      <Mobile />
    </>
  )
}
