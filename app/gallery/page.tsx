import getPhotos from '@/actions/getPhotos'
import BlurImage from '@/components/BlurImage'
import { GALLERY } from '@/constants/settings'

export default async function Gallery() {
  const photos = await getPhotos(12)
  return (
    <div className="mt-24">
      <h2 className="
          text-2xl
          md:text-3xl
          md:mt-100
          my-4
          text-center
          "
      >
        {GALLERY}
      </h2>
      <div className="
      mx-auto
      max-w-2xl
      py-12
      px-4
      sm:py-14
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
    </div>
  )
}
