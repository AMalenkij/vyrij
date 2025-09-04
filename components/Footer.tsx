import type React from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import SocialMediaSection from "./SocialLink";
import { ROUTES_CONFIG } from "@/constants/routes";
import { useTranslations } from "next-intl";
import ExternalLink from "@/components/ui/ExternalLink";
import { DESIGN, LINK_DESIGN } from "@/constants/app-content";

export default function Footer() {
  const tNavMenu = useTranslations("Nav");
  const tFooter = useTranslations("Footer");
  const currentYear = new Date().getFullYear();
  const routes = [
    {
      key: "home",
      label: tNavMenu("home"),
      href: ROUTES_CONFIG.HOME,
    },
    {
      key: "events",
      label: tNavMenu("events"),
      href: ROUTES_CONFIG.EVENTS,
    },
    {
      key: "concerts",
      label: tNavMenu("concerts"),
      href: ROUTES_CONFIG.CONCERTS,
    },
    {
      key: "gallery",
      label: tNavMenu("gallery"),
      href: ROUTES_CONFIG.GALLERY,
    },
    {
      key: "terms",
      label: tNavMenu("terms"),
      href: ROUTES_CONFIG.TERMS,
    },
    {
      key: "privacy",
      label: tNavMenu("privacy"),
      href: ROUTES_CONFIG.PRIVACY,
    },
  ];

  return (
    <div
      className="relative mt-96 h-screen"
      style={{
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
      }}
    >
      <footer className="glass-surface fixed bottom-0 h-screen w-full bg-gradient-to-b from-red-500/60 to-red-600/30 px-6 pb-4 md:pb-6">
        <div className="container mx-auto mt-14 md:mt-32">
          {/* Main content grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">
            {/* About section */}
            <div className="hidden space-y-3 md:block md:space-y-4">
              <h3 className="font-semibold text-lg">
                {tFooter("about.title")}
              </h3>
              <p className="text-sm leading-relaxed opacity-90">
                {tFooter("about.description")}
              </p>
            </div>

            {/* Contact section */}
            <div className="space-y-2 md:space-y-4">
              <h3 className="font-medium text-sm uppercase tracking-wide opacity-80">
                {tFooter("contact.title")}
              </h3>
              <div className="space-y-2 px-2">
                <Link
                  href={`mailto:${tFooter("contact.email")}`}
                  className="block text-sm transition-opacity hover:opacity-80"
                >
                  {tFooter("contact.email")}
                </Link>
                <Link
                  href={`tel:${tFooter("contact.phone").replace(/\s/g, "")}`}
                  className="block text-sm transition-opacity hover:opacity-80"
                >
                  {tFooter("contact.phone")}
                </Link>
                <address className="text-sm not-italic opacity-90">
                  {tFooter("contact.address.line1")}
                  <br />
                  {tFooter("contact.address.line2")}
                </address>
              </div>
            </div>

            <SocialMediaSection title={tFooter("social.title")} />

            {/* Navigation section */}
            <div className="space-y-2 md:space-y-4">
              <h3 className="font-medium text-sm uppercase tracking-wide opacity-80">
                {tFooter("navigation.title")}
              </h3>
              <Navigation routes={routes} className="flex flex-col" />
            </div>
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-white/20 md:my-8 md:mt-20" />

          {/* Copyright section */}
          <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row md:gap-2">
            <p className="opacity-90">
              &copy; {currentYear} {tFooter("copyright.text")}
            </p>
            <ExternalLink href={LINK_DESIGN}>{DESIGN}</ExternalLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
