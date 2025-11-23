import dynamic from "next/dynamic";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import Hero from "@/components/Hero";
import { EXCLUDE_YEAR } from "@/constants/app-content";
import heroImg from "@/public/img/hero.webp";
import { client } from "@/sanity/lib/client";
import { majorEventsYearsQuery } from "@/sanity/lib/queries";
import type { Locale } from "@/types/app";

const HomeClient = dynamic(() => import("@/components/HomeClient"));
const ParallaxGallery = dynamic(() => import("@/components/ParallaxGallery"), {
  ssr: false,
});
const Scrollbar = dynamic(() => import("@/components/Scrollbar"), {
  ssr: false,
});
const EventsTimeline = dynamic(() => import("@/components/EventsTimeline"));

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const majorEventsYears = await client.fetch(majorEventsYearsQuery);

  const allMajorYears = majorEventsYears.map(({ date }: { date: string }) =>
    new Date(date).getFullYear().toString(),
  );

  const { locale } = await params;
  setRequestLocale(locale);
  const tHero = await getTranslations("Hero");
  const heroTranslations = {
    title: tHero("title"),
    subtitle: tHero("subtitle"),
    author: tHero("author"),
    scrollText: tHero("scrollText"),
  };

  const homeClientTranslations = {
    aboutText: tHero("aboutText"),
    galleryImage: tHero("altTexts.galleryImage"),
  };

  const parallaxTranslations = {
    events: tHero("events"),
  };

  return (
    <>
      <Hero translations={heroTranslations}>
        <Image
          src={heroImg}
          alt={tHero("altTexts.heroImage")}
          placeholder="blur"
          priority={true}
          className="absolute top-20 right-10 max-w-[100px] md:max-w-full"
        />
      </Hero>

      <Suspense>
        <HomeClient translations={homeClientTranslations} />
      </Suspense>
      <Suspense>
        <ParallaxGallery
          year={EXCLUDE_YEAR}
          translations={parallaxTranslations}
        />
      </Suspense>
      <Suspense>
        <Scrollbar MajorEventYears={allMajorYears} />
      </Suspense>
      <Suspense>
        <EventsTimeline locale={locale} excludeYear={EXCLUDE_YEAR} />
      </Suspense>
    </>
  );
}
