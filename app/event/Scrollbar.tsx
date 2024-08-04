'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { YEAR_SYMBOL, EVENTS_HASH_ENDPOINT, YEAR } from '@/constants/settings'

export default function Scrollbar({ MajorEventYears }: { MajorEventYears: number[] }) {
  const searchParams = useSearchParams()
  const currentSelectedYear = searchParams.get(YEAR)

  return (
    <div>
      {MajorEventYears.map((year) => {
        const isCurrentYear = year.toString() === currentSelectedYear
        return (
          <div key={`Scrollbar-${year}`} className="my-4">
            <Link
              href={`${EVENTS_HASH_ENDPOINT}${year}`}
              className={`
                transition-colors duration-500
                ${isCurrentYear ? 'text-red-500 pointer-events-none' : 'hover:text-white'}
              `}
            >
              {year}
              <span className="text-xs ml-1">{YEAR_SYMBOL}</span>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
