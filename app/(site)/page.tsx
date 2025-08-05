import heroImg from "@/public/img/hero.webp";
import ParallaxGallery from "@/components/ParallaxGallery";
import HomeClient from "@/components/HomeClient";
import EventsTimeline from "@/components/EventsTimeline";
import Hero from "@/components/Hero";
import Image from "next/image";
import { TEXT_CONSTANTS } from "@/constants/app-content";

export default function Home() {
  return (
    <>
      <Hero>
        <Image
          src={heroImg}
          alt={TEXT_CONSTANTS.ALT_TEXTS.HERO_IMAGE}
          width={188}
          height={250}
          className="absolute top-20 right-10 max-w-[120px] md:max-w-full"
        />
      </Hero>
      <HomeClient />
      <ParallaxGallery />
      <EventsTimeline excludeYears="2019" />
    </>
  );
}
