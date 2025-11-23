import { cn } from "@/lib/utils";
import type { FormattedDate } from "@/formatters/formattedDate";

type ConcertType = {
  index: number;
  time: string;
  title: string;
  location: {
    place: string;
    address: string;
  };
  translation: Record<string, string>;
  formattedDate: FormattedDate;
};

export default function ConcertCard({
  title,
  time,
  location,
  index = 0,
  translation,
  formattedDate,
}: ConcertType) {
  const { day, month, year } = formattedDate;
  const isEvenIndex = index % 2 === 0;

  return (
    <>
      <div
        className={cn(
          "mx-auto flex items-center md:mb-6 md:ml-3",
          isEvenIndex ? "" : "bg-muted/20",
        )}
      >
        <div className="mr-3 grid gap-y-1 px-3 py-2 text-center lg:mr-0 lg:flex lg:w-72 lg:justify-between lg:gap-x-4 lg:gap-y-0 lg:px-3">
          <div className="text-3xl md:text-5xl lg:w-20">{day}</div>
          <div className="grid-cols-2 gap-y-1 lg:w-20">
            <div className="text-xl">{month}</div>
            <div className="text-xl">{year}</div>
          </div>
          <div className={"pt-1 font-light text-xl lg:w-24 lg:text-3xl"}>
            {time}
          </div>
        </div>
        <div className="grid items-center lf:gap-x-20 gap-y-1 lg:flex lg:basis-full">
          <h2 className="text-2xl lg:basis-4/5 lg:px-10 lg:text-center lg:font-semibold lg:text-2xl">
            {title}
          </h2>
          <div className="basis-4/5">
            <div className="font-bold">
              <span className="mr-1 text-sm opacity-75">
                {translation.locationTitle}:
              </span>
              {location.place}
            </div>
            <div>
              <span className="mr-1 text-sm opacity-75">
                {translation.addressTitle}:
              </span>
              {location.address}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
