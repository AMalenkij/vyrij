import getPhoto from '@/actions/getPhoto'
import BlurImage from '@/components/BlurImage'

export default async function Gallery() {
  const concertsData = await getPhoto()
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {concertsData.map((item) => (
          <BlurImage key={item.photo_id} image={item} />
        ))}
      </div>
    </div>
  )
}
