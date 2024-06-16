export interface MajorEvents {
  year:number
  title: string
  photos: string
}

export interface EventMedia {
  href: string
  display_order: number
  type: 'photo' | 'video'
}

export interface EventWithMedia {
  month: number
  day: number
  description: string
  media: EventMedia[]
}

export interface CombinedEventData {
  year: number
  title: string
  photos: string
  eventsWithMedia: EventWithMedia[]
}
