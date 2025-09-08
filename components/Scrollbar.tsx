"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

export const YEAR_SYMBOL = "р";
export const YEAR = "year";

export function Scrollbar({
  MajorEventYears,
}: {
  MajorEventYears: string[] | string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentSelectedYear = searchParams.get(YEAR);

  const years = Array.isArray(MajorEventYears)
    ? MajorEventYears
    : [MajorEventYears];

  const handleClick = (year: string) => {
    router.push(`?${YEAR}=${year}`, { scroll: false });
    const el = document.getElementById(year);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="sticky top-1/3 left-[5vw] z-100 hidden h-1/2 w-100 font-accent font-bold text-xl 2xl:flex">
      <ul className="list-none">
        {years.map((year) => {
          const isCurrentYear = year.toString() === currentSelectedYear;
          return (
            <li key={year} className="my-4 list-none">
              <Button
                variant="link"
                type="button"
                onClick={() => handleClick(year.toString())}
                className={`text-2xl lowercase transition-colors duration-300 ${
                  isCurrentYear
                    ? "pointer-events-none text-red-400"
                    : "hover:text-foreground"
                }`}
              >
                {year}
                <span className="ml-1 text-xs">{YEAR_SYMBOL}</span>
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
