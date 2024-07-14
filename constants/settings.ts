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

export const ROUTES = (pathName: string) => [
  {
    label: 'Головна',
    active: pathName === '/',
    href: '/',
  },
  {
    label: 'Хронологія',
    active: pathName === '/timeline',
    href: '/timeline',
  },
  {
    label: 'Події',
    active: pathName === '/event',
    href: '/event/',
  },
  {
    label: 'Концерти',
    active: pathName === '/concerts',
    href: '/concerts',
  },
  {
    label: 'Галерея',
    active: pathName === '/gallery',
    href: '/gallery',
  },
] as const

export const PHOTO_MAIN_DATA: PhotoMainData[] = [
  { id: 1, type: 'plane1', positon_top: 70, positon_left: 85, width: 230, photos: 'image-lokpafag' },
  { id: 2, type: 'plane1', positon_top: 0, positon_left: 90, width: 175, photos: 'image-lokpam5w' },
  { id: 3, type: 'plane1', positon_top: -20, positon_left: 35, width: 150, photos: 'image-lp39wpxo' },
  { id: 4, type: 'plane2', positon_top: 0, positon_left: 5, width: 150, photos: 'image-lp39x58b' },
  { id: 5, type: 'plane2', positon_top: 90, positon_left: 10, width: 200, photos: 'image-lp4m8w93' },
  { id: 6, type: 'plane2', positon_top: 79, positon_left: 70, width: 200, photos: 'image-lqnjoxk4' },
  { id: 7, type: 'plane3', positon_top: -13, positon_left: 85, width: 150, photos: 'image-lqnjxe3e' },
]

export const SUPABASE_STORAGE_URL = 'https://rhxxydegllovbxiecjrp.supabase.co/storage/v1/object/public/photos/'
