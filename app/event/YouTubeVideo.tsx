import { twMerge } from 'tailwind-merge'

export default function YouTubeVideo({ url, className }: { url: string, className?: string }) {
  function urlChar(urlSting:string) {
    return urlSting.startsWith('h')
  }
  if (!urlChar(url)) return <div className={twMerge('object-cover', className)}>{url}</div>
  return (
    <div className={twMerge('object-cover', className)}>
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
