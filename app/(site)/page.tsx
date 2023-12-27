import HeroHeaders from '@/components/HeroHeaders'
import FloatingImageGallery from './FloatingImageGallery'

export default function Home() {
  return (
    <main>
      <FloatingImageGallery />
      <div className="flex items-center justify-center h-screen"><HeroHeaders /></div>
    </main>
  )
}
