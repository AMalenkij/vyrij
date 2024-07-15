import { twMerge } from 'tailwind-merge'

export default function YouTubeVideo({ url, className }: { url: string, className?: string }) {
  return (
    <div className={twMerge('object-cover', className)}>
      <iframe
        src={url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  )
}
