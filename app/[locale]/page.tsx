import heroImg from "@/public/img/hero.webp";
import ParallaxGallery from "@/components/ParallaxGallery";
import HomeClient from "@/components/HomeClient";
import EventsTimeline from "@/components/EventsTimeline";
import Hero from "@/components/Hero";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { type Locale } from "@/types/app";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
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
          className="absolute top-20 right-10 max-w-[120px] md:max-w-full"
        />
      </Hero>

      <HomeClient translations={homeClientTranslations} />
      <ParallaxGallery year="2019" translations={parallaxTranslations} />
      <EventsTimeline locale={locale} excludeYears="2019" />
    </>
  );
}
