/* eslint-disable max-len */
import Link from 'next/link'
import {
  HERO_TEXT_END, SOCIAL_MEDIA, DESIGNER_NAME, RIGHTS_RESERVED, DESIGN_TEXT, DESIGNER_URL,
} from '@/constants/settings'

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="text-2xl hover:text-red-500 transition-colors duration-300"
    >
      {children}
    </Link>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-20">
      <div className="text-center text-4xl p-2 mb-8">{HERO_TEXT_END}</div>
      <div className="w-full h-1 container bg-red-500" />
      <div className="container mx-auto px-4">
        <div className="flex justify-between space-x-10 py-10 ">
          <SocialLink href={SOCIAL_MEDIA.FACEBOOK.URL} label={SOCIAL_MEDIA.FACEBOOK.LABEL}>
            {SOCIAL_MEDIA.FACEBOOK.TEXT}
          </SocialLink>
          <SocialLink href={SOCIAL_MEDIA.YOUTUBE.URL} label={SOCIAL_MEDIA.YOUTUBE.LABEL}>
            {SOCIAL_MEDIA.YOUTUBE.TEXT}
          </SocialLink>
          <SocialLink href={SOCIAL_MEDIA.INSTAGRAM.URL} label={SOCIAL_MEDIA.INSTAGRAM.LABEL}>
            {SOCIAL_MEDIA.INSTAGRAM.TEXT}
          </SocialLink>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center py-6 text-sm gap-10">
          <div>
            &copy;
            {' '}
            {currentYear}
            {' '}
            Vyrij.
            {' '}
            {RIGHTS_RESERVED}
          </div>
          <div className="mt-2 sm:mt-0">
            {DESIGN_TEXT}
            {' '}
            <Link href={DESIGNER_URL} className="hover:underline">{DESIGNER_NAME}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
