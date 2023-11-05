/* eslint-disable object-curly-newline */
import HeroHeaders from '@/components/HeroHeaders'
import ImgElementMain from '@/components/ImgElementMain'
import getPhotos from '@/actions/getPhotos'
import { supabaseStorageURL } from '@/constants/settings'

const imageSettings = [
  { positionX: 0, positionY: 0, height: 200, width: 200 },
  { positionX: 10, positionY: 30, height: 150, width: 150 },
  { positionX: 5, positionY: 50, height: 200, width: 200 },
  { positionX: 30, positionY: 70, height: 180, width: 180 },
  { positionX: 50, positionY: 70, height: 300, width: 300 },
  { positionX: 30, positionY: 0, height: 200, width: 200 },
  { positionX: 80, positionY: 10, height: 220, width: 220 },
  { positionX: 50, positionY: 10, height: 280, width: 280 },
]

export default async function Home() {
  const photos = await getPhotos(8)
  const imagePropsArray = photos.map((photo, index) => ({
    name: `Image ${index + 1}`,
    src: photo.href,
    positionX: imageSettings[index].positionX,
    positionY: imageSettings[index].positionY,
    hight: imageSettings[index].height,
    width: imageSettings[index].width,
  }))

  return (
    <main className="container mx-auto h-screen justify-center items-center flex relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <HeroHeaders />
      </div>
      <div className="absolute inset-0">
        {imagePropsArray.map((imageProps) => (
          <ImgElementMain
            key={imageProps.name}
            name={imageProps.name}
            src={`${supabaseStorageURL}${imageProps.src}`}
            positionX={imageProps.positionX}
            positionY={imageProps.positionY}
            hight={imageProps.hight}
            width={imageProps.width}
          />
        ))}
      </div>
    </main>
  )
}
