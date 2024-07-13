import { YEAR_SYMBOL } from '@/constants/settings'

export default function VerticalTimelineLine({ year }: { year: number }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="md:h-60 sm:h-36 h-28 w-1 bg-border bg-opacity-10" />
      <div className="text-gray text-18 mt-4">
        {year}
        <span className="text-12">{YEAR_SYMBOL}</span>
      </div>
    </div>
  )
}
