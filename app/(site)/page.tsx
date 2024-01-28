import { useStore } from '@/state/photoMain'
import HeroHeaders from '@/components/HeroHeaders'
import FloatingImageGallery from './FloatingImageGallery'
import imgHero from '@/public/img/Hero.jpg'

export default function Home() {
  const dataPhotoMain = useStore.getState().photoMain
  return (
    <main>
      <FloatingImageGallery data={dataPhotoMain}>
        <div className="flex items-center justify-center h-screen">
          <HeroHeaders imgSrc={imgHero} />
        </div>
      </FloatingImageGallery>
    </main>
  )
}
