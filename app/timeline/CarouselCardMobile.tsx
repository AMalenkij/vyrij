import Link from 'next/link'
import Image from 'next/image'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { EVENTS_HASH_ENDPOINT } from '@/constants/settings'
import VerticalTimelineLine from './VerticalTimelineLine'

interface CarouselItemData {
  year: number;
  photos: string;
  title: string;
}

interface CardMobileProps {
  data: CarouselItemData[]
}

export default function CarouselCardMobile({
  data,
}: CardMobileProps) {
  return (
    <Carousel className="w-full mx-auto  max-w-xs">
      <CarouselContent className="w-[350px]">
        {data.map((item) => (
          <CarouselItem key={`carousel ${item.year}`}>
            <Card className="w-72 xs:w-[318px]">
              <CardContent className="p-0">
                <Link href={EVENTS_HASH_ENDPOINT + item.year} prefetch>
                  <div className="relative h-40 xs:h-64">
                    <Image
                      src={item.photos}
                      alt={String(item.year)}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardFooter>
                    <p className="text-2xl text-start mb-4 mt-10">{item.title}</p>
                  </CardFooter>
                </Link>
              </CardContent>
            </Card>
            <div className="absolute flex gap-2 mt-2 ml-2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
            <VerticalTimelineLine year={item.year} />

          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
