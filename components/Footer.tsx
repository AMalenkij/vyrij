/* eslint-disable max-len */
import Link from "next/link";
import { SOCIAL_MEDIA, DESIGNER_URL } from "@/constants/app-content";

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="text-2xl transition-colors duration-300 hover:underline"
    >
      {children}
    </Link>
  );
}

export default function Footer({
  heroSubtitle,
  designerName,
  copyrightNotice,
  designCreditText,
}: {
  heroSubtitle: string;
  designerName: string;
  copyrightNotice: string;
  designCreditText: string;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20">
      <div className="mb-8 p-2 text-center text-4xl">{heroSubtitle}</div>
      <div className="container h-1 w-full bg-border" />
      <div className="container mx-auto px-4">
        <div className="flex justify-between space-x-10 py-10 ">
          <SocialLink
            href={SOCIAL_MEDIA.FACEBOOK.URL}
            label={SOCIAL_MEDIA.FACEBOOK.LABEL}
          >
            {SOCIAL_MEDIA.FACEBOOK.TEXT}
          </SocialLink>
          <SocialLink
            href={SOCIAL_MEDIA.YOUTUBE.URL}
            label={SOCIAL_MEDIA.YOUTUBE.LABEL}
          >
            {SOCIAL_MEDIA.YOUTUBE.TEXT}
          </SocialLink>
          <SocialLink
            href={SOCIAL_MEDIA.INSTAGRAM.URL}
            label={SOCIAL_MEDIA.INSTAGRAM.LABEL}
          >
            {SOCIAL_MEDIA.INSTAGRAM.TEXT}
          </SocialLink>
        </div>
        <div className="flex flex-col items-center justify-center gap-10 py-6 text-sm sm:flex-row">
          <div>
            &copy; {currentYear} Vyrij. {copyrightNotice}
          </div>
          <div className="mt-2 sm:mt-0">
            {designCreditText}{" "}
            <Link href={DESIGNER_URL} className="hover:underline">
              {designerName}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
