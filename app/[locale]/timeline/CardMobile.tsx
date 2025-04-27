import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import Image from 'next/image'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { EVENTS_HASH_ENDPOINT } from '@/constants/settings'

interface CardMobileProps {
  year: number;
  description: string;
  imageSrc: string;
  className?: string;
}

export default function CardMobile({
  year, description, imageSrc, className,
}: CardMobileProps) {
  return (
    <Card className={twMerge('w-72 xs:w-[350px] flex flex-col', className)}>
      <CardContent className="p-0">
        <Link href={EVENTS_HASH_ENDPOINT + year} prefetch>
          <div className="relative h-40 xs:h-64">
            <Image
              src={imageSrc}
              alt={String(year)}
              fill
              className="object-cover"
            />
          </div>
          <CardFooter className="flex flex-col items-start p-4">
            <p className="text-xl mt-2">{description}</p>
          </CardFooter>
        </Link>
      </CardContent>
    </Card>
  )
}
