import { YEAR_SYMBOL } from '@/constants/settings'

export default function VerticalTimelineLine({ year }: { year: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-0 sm:mt-0 md:h-60 xs:h-36 h-28 w-1 bg-border bg-opacity-10" />
      <div className="text-gray text-18 mt-1 sm:mt-4">
        {year}
        <span>{YEAR_SYMBOL}</span>
      </div>
    </div>
  )
}
