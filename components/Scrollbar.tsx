"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const YEAR_SYMBOL = "р";
export const EVENTS_HASH_ENDPOINT = "/events#";
export const YEAR = "year";

export function Scrollbar({
  MajorEventYears,
}: {
  MajorEventYears: string[] | string;
}) {
  const searchParams = useSearchParams();
  const currentSelectedYear = searchParams.get(YEAR);

  const years = Array.isArray(MajorEventYears)
    ? MajorEventYears
    : [MajorEventYears];

  return (
    <div className="lg:blok sticky top-1/3 left-20 z-100 hidden h-1/2 w-100 font-accent font-bold text-xl">
      <ul className="list-none">
        {years.map((year) => {
          const isCurrentYear = year.toString() === currentSelectedYear;
          return (
            <li key={year} className="my-4 list-none">
              <Link
                href={`${EVENTS_HASH_ENDPOINT}${year}`}
                className={`transition-colors duration-300 ${
                  isCurrentYear
                    ? "pointer-events-none text-red-500"
                    : "hover:text-foreground"
                }`}
              >
                {year}
                <span className="ml-1 text-xs">{YEAR_SYMBOL}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
