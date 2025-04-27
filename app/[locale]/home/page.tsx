import { useTranslations } from 'next-intl'

import Compass from '@/public/svg/Compass'
import mapDataToHomepageImages from '@/utils/mapDataToHomepageImages'
import { PHOTO_MAIN_DATA } from '@/constants/settings'
import LinkMainPage from '@/components/LinkMainPage'
import WithMotion from '@/components/withMotion'
import Hero from './Hero'
import FloatingImageGallery from './FloatingImageGallery'
import Mobile from './Mobile'

export default function Home() {
  const t = useTranslations('HomePage')
  const photoMain = mapDataToHomepageImages(PHOTO_MAIN_DATA)
  return (
    <>
      <FloatingImageGallery photoMain={photoMain}>
        <>
          <Hero heroDescription={t('heroDescription')} heroSubtitle={t('heroSubtitle')} choirName={t('choirName')} />
          <WithMotion>
            <LinkMainPage text={t('explore')} Icon={<Compass />} />
          </WithMotion>
        </>
      </FloatingImageGallery>
      <Mobile
        quoteStart={t('quoteStart')}
        quoteEnd={t('quoteEnd')}
        author={t('author')}
        explore={t('explore')}
      />
    </>
  )
}
