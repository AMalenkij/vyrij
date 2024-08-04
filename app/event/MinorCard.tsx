import type { EventWithMedia, EventMedia } from '@/types/modifiedDataFromSupabase'
import getMonthNameUkr from '@/utils/getMonthNameUkr'
import YouTubeVideo from './YouTubeVideo'
import RenderPhoto from './RenderPhoto'

function MediaItem({ item, className } : { item:EventMedia, className?: string }) {
  if (item.type === 'photo') return <RenderPhoto photoUrl={item.href} className={className} />
  if (item.type === 'video') return <YouTubeVideo url={item.href} className={className} />
  return null
}

export default function MinorCard({ eventsWithMedia }: { eventsWithMedia: EventWithMedia }) {
  const {
    month, day, description, media = [],
  } = eventsWithMedia

  const renderPhotosByCount = (mediaItems: EventMedia[]) => {
    const count = mediaItems.length

    switch (count) {
      case 1:
        return <MediaItem item={mediaItems[0]} />
      case 2:
        return (
          <div className="grid grid-cols-2 gap-4">
            {mediaItems.map((item) => (
              <MediaItem key={item.display_order} item={item} />
            ))}
          </div>
        )
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="-ml-16 md:col-span-2">
              <MediaItem item={mediaItems[0]} />
            </div>
            <MediaItem item={mediaItems[1]} />
            <MediaItem item={mediaItems[2]} />
          </div>
        )
      case 4:
        return (
          <div className="grid grid-cols-2 gap-4 h-[calc(70vh-250px)] lg:h-[calc(100vh-200px)]">
            <MediaItem item={mediaItems[0]} className="md:-ml-6 ml-2" />
            <MediaItem item={mediaItems[1]} />
            <MediaItem item={mediaItems[2]} />
            <MediaItem item={mediaItems[3]} />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <article className="container mx-auto py-8">
      <header>
        <h2 className="text-2xl lg:text-3xl font-semibold mb-4">
          {day}
          {' '}
          {getMonthNameUkr(month)}
        </h2>
      </header>
      <p className="text-lg lg:text-xl whitespace-pre-line pb-8">{description}</p>
      {renderPhotosByCount(media)}
    </article>
  )
}
