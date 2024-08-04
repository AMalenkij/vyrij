import { twMerge } from 'tailwind-merge'

export default function YouTubeVideo({ url, className }: { url: string, className?: string }) {
  return (
    <iframe
      className={twMerge('w-full aspect-video', className)}
      src={url}
      title="YouTube video player"
      allowFullScreen
    />
  )
}
