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

export const SUPABASE_STORAGE_URL = 'https://rhxxydegllovbxiecjrp.supabase.co/storage/v1/object/public/photos/'
