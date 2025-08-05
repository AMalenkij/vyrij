import type React from "react";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";

// Social media links for Vyrij choir
export const SOCIAL_MEDIA = {
  FACEBOOK: {
    URL: "https://www.facebook.com/chorvyrij",
    LABEL: "Facebook",
    TEXT: "Facebook",
  },
  YOUTUBE: {
    URL: "https://www.youtube.com/@chorvyrij",
    LABEL: "YouTube",
    TEXT: "YouTube",
  },
  INSTAGRAM: {
    URL: "https://www.instagram.com/chor_vyrij/",
    LABEL: "Instagram",
    TEXT: "Instagram",
  },
} as const;

// Contact information
const CONTACT_INFO = {
  EMAIL: "chorvyrij@gmail.com",
  PHONE: "+380 XX XXX XX XX",
  ADDRESS: {
    LINE1: "вул. Музична, 15",
    LINE2: "Київ, Україна",
  },
};

// All text content extracted into an object
const FOOTER_TEXT = {
  SECTIONS: {
    ABOUT: {
      TITLE: 'Хор "Вирій"',
      DESCRIPTION:
        "Український академічний хор з багаторічною історією та традиціями. Ми зберігаємо та популяризуємо українську хорову культуру.",
    },
    CONTACT: {
      TITLE: "Контакти",
    },
    SOCIAL: {
      TITLE: "Соціальні мережі",
    },
    NAVIGATION: {
      TITLE: "Навігація",
    },
  },
  COPYRIGHT: {
    TEXT: 'Хор "Вирій". Всі права захищені.',
  },
  LEGAL: {
    PRIVACY: "Політика конфіденційності",
    TERMS: "Умови використання",
  },
} as const;

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
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <Button
        variant="link"
        size="sm"
        className="h-auto px-0 text-white uppercase"
      >
        {children}
      </Button>
    </Link>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div
      className="relative mt-96 h-screen"
      style={{
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
      }}
    >
      <footer className="fixed bottom-0 h-[100vh] w-full bg-gradient-to-b from-red-500 to-red-600/50 px-6 pb-4 md:pb-6">
        <div className="container mx-auto mt-14 text-white md:mt-32">
          {/* Main content grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">
            {/* About section */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="font-semibold text-lg">
                {FOOTER_TEXT.SECTIONS.ABOUT.TITLE}
              </h3>
              <p className="text-sm leading-relaxed opacity-90">
                {FOOTER_TEXT.SECTIONS.ABOUT.DESCRIPTION}
              </p>
            </div>

            {/* Contact section */}
            <div className="space-y-2 md:space-y-4">
              <h3 className="font-medium text-sm uppercase tracking-wide opacity-80">
                {FOOTER_TEXT.SECTIONS.CONTACT.TITLE}
              </h3>
              <div className="space-y-2">
                <Link
                  href={`mailto:${CONTACT_INFO.EMAIL}`}
                  className="block text-sm transition-opacity hover:opacity-80"
                >
                  {CONTACT_INFO.EMAIL}
                </Link>
                <Link
                  href={`tel:${CONTACT_INFO.PHONE.replace(/\s/g, "")}`}
                  className="block text-sm transition-opacity hover:opacity-80"
                >
                  {CONTACT_INFO.PHONE}
                </Link>
                <address className="text-sm not-italic opacity-90">
                  {CONTACT_INFO.ADDRESS.LINE1}
                  <br />
                  {CONTACT_INFO.ADDRESS.LINE2}
                </address>
              </div>
            </div>

            {/* Social media section */}
            <div className="space-y-3 md:space-y-4">
              <h3 className="font-medium text-sm uppercase tracking-wide opacity-80">
                {FOOTER_TEXT.SECTIONS.SOCIAL.TITLE}
              </h3>
              <div className="flex flex-col space-y-2">
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
            </div>

            {/* Navigation section */}
            <div className="hidden space-y-3 md:block md:space-y-4">
              <h3 className="font-medium text-sm uppercase tracking-wide opacity-80">
                {FOOTER_TEXT.SECTIONS.NAVIGATION.TITLE}
              </h3>
              <Navigation className="flex flex-col items-start" />
            </div>
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-white/20 md:my-8 md:mt-20" />

          {/* Copyright section */}
          <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row md:gap-2">
            <p className="opacity-90">
              &copy; {currentYear} {FOOTER_TEXT.COPYRIGHT.TEXT}
            </p>
            <div className="flex items-center gap-4 text-xs opacity-75">
              <Link
                href="/privacy"
                className="transition-opacity hover:opacity-100"
              >
                {FOOTER_TEXT.LEGAL.PRIVACY}
              </Link>
              {/*<span>•</span>*/}
              <Link
                href="/terms"
                className="transition-opacity hover:opacity-100"
              >
                {FOOTER_TEXT.LEGAL.TERMS}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
