import { supabaseStorageURL } from '@/constants/settings'
import { HomepageImages, PhotoMainData } from '@/types'

export default function mapDataToHomepageImages(data: PhotoMainData[]): HomepageImages[] {
  return data.map((element) => ({
    id: element.photo_main_id,
    width: element.width,
    type: element.type,
    src: element.photos ? `${supabaseStorageURL}${element.photos.href}` : null,
    style: {
      position: 'absolute',
      left: `${element.positon_left}%`,
      top: `${element.positon_top}%`,
    },
  }))
}
