import { cn } from "@/lib/utils";

type ConcertType = {
  index: number;
  date: string;
  time: string | null;
  title: string | null;
  location: {
    place: string;
    address: string;
  } | null;
  translation: Record<string, string>;
};

export default function ConcertCard({
  date,
  title,
  time,
  location,
  index = 0,
  translation,
}: ConcertType) {
  const dateObj = new Date(date);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = dateObj.toLocaleDateString("en", { month: "short" });
  const year = dateObj.getFullYear().toString();
  const isEvenIndex = index % 2 === 0;

  return (
    <>
      <div
        className={cn(
          "mx-auto flex items-center md:mb-6 md:ml-3",
          isEvenIndex ? "" : "bg-stone-900/25",
        )}
      >
        <div className="mr-3 grid gap-y-1 px-3 py-2 text-center lg:mr-0 lg:flex lg:w-72 lg:justify-between lg:gap-x-4 lg:gap-y-0 lg:px-3">
          <div className="text-3xl md:text-5xl lg:w-20">{day}</div>
          <div className="grid-cols-2 gap-y-1 lg:w-20">
            <div className="text-xl">{month}</div>
            <div className="text-xl">{year}</div>
          </div>
          <div
            className={cn(
              "pt-1 font-light text-xl lg:w-24 lg:text-4xl",
              !time && "text-sm opacity-75 lg:text-base",
            )}
          >
            {time || translation.noTime}
          </div>
        </div>
        <div className="grid items-center lf:gap-x-20 gap-y-1 lg:flex lg:basis-full">
          <h2 className="text-2xl lg:basis-4/5 lg:px-10 lg:text-center lg:font-semibold lg:text-2xl">
            {title || translation.noTitle}
          </h2>
          <div className="basis-4/5">
            {location ? (
              <>
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
              </>
            ) : (
              <div className="text-sm italic opacity-75">
                {translation.noLocation}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
