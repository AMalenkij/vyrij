import { SUPABASE_STORAGE_URL } from '@/constants/settings'
import { HomepageImage, PhotoMainData } from '@/types'

export default function mapDataToHomepageImages(data: PhotoMainData[]): HomepageImage[] {
  return data.map((element) => ({
    id: element.id,
    width: element.width,
    type: element.type,
    src: `${SUPABASE_STORAGE_URL}${element.photos}`,
    style: {
      left: `${element.positon_left}%`,
      top: `${element.positon_top}%`,
    },
  }))
}
