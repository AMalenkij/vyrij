import heroImg from "@/public/img/hero.jpg";
import heroImg1 from "@/public/img/hero1.png";
import heroImg3 from "@/public/img/hero3.png";
import heroImg5 from "@/public/img/hero5.png";
import heroImg7 from "@/public/img/hero7.jpg";
import heroImg8 from "@/public/img/hero8.jpg";
import heroImg9 from "@/public/img/hero9.jpg";
import heroImg10 from "@/public/img/hero10.jpg";
import heroImg11 from "@/public/img/hero11.jpg";
import Header from "@/components/Header";
import ParallaxGallery from "@/components/ParallaxGallery";
import HomeClient from "@/components/HomeClient";
import EventsTimeline from "@/components/EventsTimeline";
import Hero from "@/components/Hero";
import Image from "next/image";
import { TEXT_CONSTANTS } from "@/constants/app-content";

// Конфигурация галереи изображений
//to do: Вынести в константы
const galleryImages = [
  {
    src: heroImg1,
    width: 288,
    height: 250,
    className: "absolute top-40 right-[10vh]",
  },
  {
    src: heroImg5,
    width: 200,
    height: 250,
    className: "absolute top-[35vh] right-[40vh]",
  },
  {
    src: heroImg3,
    width: 200,
    height: 250,
    className: "absolute top-[50vh] left-[30vh]",
  },
  {
    src: heroImg7,
    width: 200,
    height: 250,
    className: "absolute top-[90vh] right-[40vh]",
  },
  {
    src: heroImg8,
    width: 200,
    height: 250,
    className: "absolute top-[70vh] left-[40vh]",
  },
  {
    src: heroImg9,
    width: 200,
    height: 250,
    className: "absolute top-[104.5vh] left-[30.5vw]",
  },
  {
    src: heroImg10,
    width: 200,
    height: 250,
    className: "absolute top-[124.5vh] left-[55.5vw]",
  },
  {
    src: heroImg11,
    width: 200,
    height: 250,
    className: "absolute top-[139.5vh] left-[40.5vw]",
  },
];

export default function Home() {
  return (
    <>
      <div className="container relative mx-auto h-full">
        <Hero>
          <Image
            src={heroImg}
            alt={TEXT_CONSTANTS.ALT_TEXTS.HERO_IMAGE}
            width={188}
            height={250}
            className="absolute top-20 right-10"
          />
        </Hero>
        <HomeClient galleryImages={galleryImages}>
          <Header />
        </HomeClient>
      </div>
      <ParallaxGallery />
      <Header />
      <EventsTimeline excludeYears="2019" />
    </>
  );
}
