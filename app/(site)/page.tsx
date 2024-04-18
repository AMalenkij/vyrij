import HeroHeaders from '@/components/HeroHeaders'
import { type HomepageImages } from '@/types'
import getPhotosMain from '@/actions/getPhotosMain'
import mapDataToHomepageImages from '@/utils/mapDataToHomepageImages'
import FloatingImageGallery from './FloatingImageGallery'

export default async function Home() {
  const data = await getPhotosMain()
  const photoMain: HomepageImages[] = data ? mapDataToHomepageImages(data) : []
  return (
    <main>
      {photoMain
        ? <FloatingImageGallery photoMain={photoMain}><HeroHeaders /></FloatingImageGallery>
        : <HeroHeaders />}
    </main>
  )
}
