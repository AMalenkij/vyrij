/* eslint-disable object-curly-newline */
import { type PhotoMainData } from '@/types'

export const QUOTE_TEXT = 'Людина нібито не літає…'
export const QUOTE_TEXT_NEXT = 'A крила має!'
export const AUTOR = 'Л. Костенко'
export const HERO_TEXT = 'Квітень 2022. Катовіце. Останні приготування перед виступом: за хвилину хор виступатиме на сцені  Концертного залу Симфонічного оркестру Національного радіо Польщі.'
export const HERO_TEXT_END = 'Це наша історія.'
export const EXPLORE = 'Досліджуйте'
export const CHOR = 'Chor'

export const CHOOSE_A_YEAR = 'Виберіть рік'
export const YEAR_SYMBOL = 'р'
export const SCROLL = 'Прокрутка'

export const LIGHT = 'Світла'
export const DARK = 'Темна'
export const SYSTEM = 'Системна'

export const GALLERY = 'Галерея'
export const CONCERTS = 'Концерти'

export const FUTURES = 'Майбутні'
export const PAST = 'Минулі'
export const EVENTS_HASH_ENDPOINT = '/event#'
export const EVENTS_YEAR_QUERY_ENDPOINT = '/event?year='

export const HOME_ROUTE = '/home'
export const TIMELINE_ROUTE = '/timeline'
export const EVENT_ROUTE = '/event'
export const CONCERTS_ROUTE = '/concerts'
export const GALLERY_ROUTE = '/gallery'

export const YEAR = 'year'

export const ROUTES = (pathName: string) => [
  {
    label: 'Головна',
    active: pathName === HOME_ROUTE,
    href: HOME_ROUTE,
  },
  {
    label: 'Хронологія',
    active: pathName === TIMELINE_ROUTE,
    href: TIMELINE_ROUTE,
  },
  {
    label: 'Події',
    active: pathName === EVENT_ROUTE,
    href: EVENT_ROUTE,
  },
  {
    label: CONCERTS,
    active: pathName === CONCERTS_ROUTE,
    href: CONCERTS_ROUTE,
  },
  {
    label: GALLERY,
    active: pathName === GALLERY_ROUTE,
    href: GALLERY_ROUTE,
  },
] as const

// Footer
export const SOCIAL_MEDIA = {
  FACEBOOK: {
    URL: 'https://www.facebook.com/chorvyrij',
    LABEL: 'Facebook',
    TEXT: 'Facebook',
  },
  YOUTUBE: {
    URL: 'https://www.youtube.com/@chorvyrij',
    LABEL: 'YouTube',
    TEXT: 'YouTube',
  },
  INSTAGRAM: {
    URL: 'https://www.instagram.com/chor_vyrij/',
    LABEL: 'Instagram',
    TEXT: 'Instagram',
  },
} as const

export const DESIGNER_NAME = 'Антон Маленький'
export const RIGHTS_RESERVED = 'Всі права захищені.'
export const DESIGN_TEXT = 'Дизайн:'
export const DESIGNER_URL = 'https://github.com/AMalenkij:'

export const PHOTO_MAIN_DATA: PhotoMainData[] = [
  { id: 1, type: 'plane1', positon_top: 70, positon_left: 85, width: 170, photos: 'image-lokpafag' },
  { id: 2, type: 'plane1', positon_top: 13, positon_left: 40, width: 120, photos: 'image-lokpam5w' },
  { id: 3, type: 'plane1', positon_top: 15, positon_left: 10, width: 200, photos: 'image-lp39wpxo' },
  { id: 4, type: 'plane2', positon_top: 55, positon_left: 5, width: 200, photos: 'image-lp39x58b' },
  { id: 5, type: 'plane2', positon_top: 90, positon_left: 10, width: 200, photos: 'image-lp4m8w93' },
  { id: 6, type: 'plane2', positon_top: 89, positon_left: 65, width: 250, photos: 'image-lqnjoxk4' },
  { id: 7, type: 'plane3', positon_top: 40, positon_left: 75, width: 250, photos: 'image-lqnjxe3e' },
]

export const SUPABASE_STORAGE_URL = 'https://rhxxydegllovbxiecjrp.supabase.co/storage/v1/object/public/photos/'
