import heroImg1 from "@/public/img/hero1.webp";
import heroImg2 from "@/public/img/hero2.webp";
import heroImg3 from "@/public/img/hero3.webp";
import heroImg4 from "@/public/img/hero4.webp";
import heroImg5 from "@/public/img/hero5.webp";
import heroImg6 from "@/public/img/hero6.webp";
import heroImg7 from "@/public/img/hero7.webp";
import heroImg8 from "@/public/img/hero8.webp";

// Конфигурация изображений main page
export const GALLERY_IMAGES = [
  {
    index: 0,
    src: heroImg1,
    width: 288,
    height: 250,
    className: "absolute top-40 right-[10vh] max-w-[201px] md:max-w-full",
  },
  {
    index: 1,
    src: heroImg2,
    width: 200,
    height: 250,
    className: "absolute top-[50vh] left-[30vh] max-w-[140px] md:max-w-full",
  },
  {
    index: 2,
    src: heroImg3,
    width: 200,
    height: 250,
    className: "absolute top-[35vh] right-[40vh] max-w-[140px] md:max-w-full",
  },
  {
    index: 3,
    src: heroImg4,
    width: 200,
    height: 250,
    className: "absolute top-[70vh] left-[40vh] max-w-[140px] md:max-w-full",
  },
  {
    index: 4,
    src: heroImg5,
    width: 200,
    height: 250,
    className: "absolute top-[90vh] right-[40vh] max-w-[140px] md:max-w-full",
  },
  {
    index: 5,
    src: heroImg6,
    width: 200,
    height: 250,
    className:
      "absolute top-[104.5vh] left-[30.5vw] max-w-[140px] md:max-w-full",
  },
  {
    index: 6,
    src: heroImg7,
    width: 200,
    height: 250,
    className:
      "absolute top-[124.5vh] left-[55.5vw] max-w-[140px] md:max-w-full",
  },
  {
    index: 7,
    src: heroImg8,
    width: 200,
    height: 250,
    className:
      "absolute top-[139.5vh] left-[40.5vw] max-w-[140px] md:max-w-full",
  },
] as const;

// Social media links data
export const SOCIAL_MEDIA = [
  {
    url: "https://www.facebook.com/chorvyrij",
    label: "Facebook",
    text: "Facebook",
  },
  {
    url: "https://www.youtube.com/@chorvyrij",
    label: "YouTube",
    text: "YouTube",
  },
  {
    url: "https://www.instagram.com/chor_vyrij/",
    label: "Instagram",
    text: "Instagram",
  },
] as const;

export const YEAR = "year";
export const EVENTS_YEAR_QUERY_ENDPOINT = "?year=";
export const HERO_TEXT_END = "Це наша історія.";
export const DESIGNER_URL = "https://github.com/AMalenkij:";

// Site metadata
export const SITE_NAME = "Vyrij";
export const SITE_DOMAIN = "vyrij.org";
export const SITE_URL = `https://${SITE_DOMAIN}`;
export const SITE_AUTHOR = { name: "Hanna Malenka", url: SITE_URL } as const;
export const OG_IMAGE = `${SITE_URL}/img/OGLogo.jpg`;

export const LINKS_STYLES =
  "uppercase relative flex flex-col inline-block px-3 leading-8 no-underline transition-colors duration-300 before:content-[''] before:absolute before:bottom-[-0.5rem] before:left-0 before:w-full before:h-0.5 before:bg-primary before:rounded-sm before:opacity-0 before:transition-all before:duration-400 hover:before:opacity-100 hover:before:transform hover:before:-translate-y-1";
