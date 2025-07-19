import splitTimestamp from "@/utils/splitTimestamp";

type ConcertType = {
  date: string | null;
  title: string | null;
  city: string | null;
  place: string | null;
  address: string | null;
};

export default function ConcertCard({
  date,
  title,
  city,
  place,
  address,
}: ConcertType) {
  if (!date) return null;
  const { date: day, month, year, time } = splitTimestamp(date);

  return (
    <>
      <div className="mx-auto flex items-center md:mb-6 md:ml-3">
        <div className="mr-3 grid gap-y-1 px-3 py-2 text-center lg:mr-0 lg:flex lg:w-72 lg:justify-between lg:gap-x-4 lg:gap-y-0 lg:px-3">
          <div className="text-5xl lg:w-20">{day}</div>
          <div className="grid-cols-2 gap-y-1 lg:w-20">
            <div className="text-xl">{month}</div>
            <div className="">{year}</div>
          </div>
          <div className="pt-1 font-light text-xl lg:w-24 lg:text-4xl">
            {time}
          </div>
        </div>
        <div className="grid items-center lf:gap-x-20 gap-y-1 lg:flex lg:basis-full">
          <h2 className="text-2xl lg:basis-4/5 lg:px-10 lg:text-center lg:font-semibold lg:text-2xl">
            {title || "Без названия"}
          </h2>
          <div className="basis-4/5">
            <div className="font-bold">{city}</div>
            <div>{place}</div>
            <div>{address}</div>
          </div>
        </div>
      </div>
      <div className="invisible mx-auto mt-2 mb-4 h-1 w-24 rounded-xl border-gradient bg-accent group-hover:visible" />
    </>
  );
}
