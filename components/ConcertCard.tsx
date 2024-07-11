import { ConcertCardProps } from '@/types'

export default function ConcertCard({
  timestamptz: {
    date, month, year, time,
  },
  title,
  location,
  link,
  place,
}: ConcertCardProps) {
  return (
    <a href={link} className="group">
      <div className="flex  mx-auto mb-7">
        <div className="lg:flex basis-1/6 lg:gap-x-10 grid gap-y-1 text-center lg:mr-0 lg:pl-10 mr-3">
          <div className="text-5xl basis-1/4 text-center">{date}</div>
          <div className="gap-y-1 grid">
            <div className="basis-1/4 text-xl">{month}</div>
            <div className="basis-1/4">{year}</div>
          </div>
          <div className="basis-1/4 text-center">{time}</div>
        </div>
        <div className="lg:flex lf:gap-x-20 lg:basis-full grid gap-y-1">
          <h2 className="lg:basis-4/5 lg:text-center text-2xl lg:font-bold lg:text-xl lg:px-10">{title}</h2>
          <div className="basis-4/5">
            <div className="font-bold">{place}</div>
            <div>{location}</div>
          </div>
        </div>
      </div>
      <div className="group-hover:visible invisible h-1 w-24 border-gradient mx-auto mt-2 mb-4 rounded-xl bg-red-600" />
    </a>
  )
}
