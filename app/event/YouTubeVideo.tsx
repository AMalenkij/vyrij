import { twMerge } from 'tailwind-merge'

export default function YouTubeVideo({ url, className }: { url: string, className?: string }) {
  return (
    <div className={twMerge('object-cover lg:w-full w-1/2', className)}>
      <iframe
        width="560"
        height="315"
        src={url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  )
}
