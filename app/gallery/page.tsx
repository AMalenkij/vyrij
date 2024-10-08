import getData from '@/actions/getData'
import BlurImage from '@/components/BlurImage'
import Title from '@/components/Title'
import { GALLERY } from '@/constants/settings'

interface PhotosType {
  photo_id: number
  href: string
}

export default async function Gallery() {
  const photos:PhotosType[] = await getData('photos', ['photo_id', 'href'])
  return (
    <>
      <Title>
        {GALLERY}
      </Title>
      <div className="
      mx-auto
      max-w-2xl
      px-4
      sm:px-6
      lg:max-w-7xl
      lg:px-8 grid
      grid-cols-1
      gap-y-10
      gap-x-6
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      xl:gap-x-8"
      >
        {photos?.map((photo) => (
          <BlurImage key={photo.photo_id} image={photo} />
        ))}
      </div>
    </>
  )
}
