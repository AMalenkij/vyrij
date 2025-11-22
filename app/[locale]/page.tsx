import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import EventsTimeline from "@/components/EventsTimeline";
import Hero from "@/components/Hero";
import HomeClient from "@/components/HomeClient";
import ParallaxGallery from "@/components/ParallaxGallery";
import { Scrollbar } from "@/components/Scrollbar";
import heroImg from "@/public/img/hero.webp";
import { client } from "@/sanity/lib/client";
import { majorEventsYearsQuery } from "@/sanity/lib/queries";
import type { Locale } from "@/types/app";

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

      <HomeClient translations={homeClientTranslations} />
      <Suspense>
        <ParallaxGallery year="2019" translations={parallaxTranslations} />
      </Suspense>
      <Suspense>
        <Scrollbar MajorEventYears={allMajorYears} />
      </Suspense>
      <EventsTimeline locale={locale} excludeYear="2019" />
    </>
  );
}
