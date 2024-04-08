interface VerticalTimelineLineProps {
  year: number;
}

export default function VerticalTimelineLine({ year }: VerticalTimelineLineProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="md:h-96 h-64 w-1 bg-blue-900 bg-opacity-10" />
      <div className="text-gray text-18 mt-4">
        {year}
        <span className="text-12">s</span>
      </div>
    </div>
  )
}
