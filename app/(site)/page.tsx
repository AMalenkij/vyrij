import { useStore } from '@/state/photoMain'
import HeroHeaders from '@/components/HeroHeaders'
import { HomepageImages } from '@/types'
import FloatingImageGallery from './FloatingImageGallery'

export default function Home() {
  const { photoMain } = useStore.getState() as { photoMain: HomepageImages[] }
  return (
    <main>
      <FloatingImageGallery photoMain={photoMain}>
        <HeroHeaders />
      </FloatingImageGallery>
    </main>
  )
}
