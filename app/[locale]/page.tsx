import heroImg from "@/public/img/hero.webp";
import ParallaxGallery from "@/components/ParallaxGallery";
import HomeClient from "@/components/HomeClient";
import EventsTimeline from "@/components/EventsTimeline";
import Hero from "@/components/Hero";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { type Locale } from "@/types/app";
import { majorEventsYearsQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { Scrollbar } from "@/components/Scrollbar";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const majorEventsYearsResult = await sanityFetch({
    query: majorEventsYearsQuery,
  });

  const majorEventsYears = majorEventsYearsResult.data;

  const allMajorYears = majorEventsYears.map(({ date }: { date: string }) =>
    new Date(date).getFullYear().toString(),
  );

  const { locale } = await params;
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
          width={188}
          height={250}
          className="absolute top-20 right-10 max-w-[100px] md:max-w-full"
        />
      </Hero>

      <HomeClient translations={homeClientTranslations} />
      <ParallaxGallery year="2019" translations={parallaxTranslations} />
      <Scrollbar MajorEventYears={allMajorYears} />
      <EventsTimeline locale={locale} excludeYears="2019" />
    </>
  );
}
