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
    src: heroImg1,
    width: 288,
    height: 250,
    className: "absolute top-40 right-[10vh]",
  },
  {
    src: heroImg2,
    width: 200,
    height: 250,
    className: "absolute top-[50vh] left-[30vh]",
  },
  {
    src: heroImg3,
    width: 200,
    height: 250,
    className: "absolute top-[35vh] right-[40vh]",
  },

  {
    src: heroImg4,
    width: 200,
    height: 250,
    className: "absolute top-[70vh] left-[40vh]",
  },
  {
    src: heroImg5,
    width: 200,
    height: 250,
    className: "absolute top-[90vh] right-[40vh]",
  },

  {
    src: heroImg6,
    width: 200,
    height: 250,
    className: "absolute top-[104.5vh] left-[30.5vw]",
  },
  {
    src: heroImg7,
    width: 200,
    height: 250,
    className: "absolute top-[124.5vh] left-[55.5vw]",
  },
  {
    src: heroImg8,
    width: 200,
    height: 250,
    className: "absolute top-[139.5vh] left-[40.5vw]",
  },
] as const;

// Текстовые константы
export const TEXT_CONSTANTS = {
  HERO_TITLE: "Людина нібито не літає…",
  HERO_SUBTITLE: "А крила має.",
  AUTHOR: "-Л. Костенко",
  SCROLL_TEXT: "(scroll to explore)",
  ABOUT_TEXT:
    'Ми Український хор "Вирій" Гданського Архіпелагу Культури, діємо при Дому культури Гама Гак',
  ALT_TEXTS: {
    HERO_IMAGE: "Hero Image",
    GALLERY_IMAGE: "Gallery Image",
  },
};

export const YEAR = "year";
export const YEAR_SYMBOL = "р";
export const EVENTS_YEAR_QUERY_ENDPOINT = "?year=";

export const QUOTE_TEXT = "Людина нібито не літає…";
export const QUOTE_TEXT_NEXT = "A крила має!";
export const AUTOR = "Л. Костенко";
export const HERO_TEXT =
  "Квітень 2022. Катовіце. Останні приготування перед виступом: за хвилину хор виступатиме на сцені  Концертного залу Симфонічного оркестру Національного радіо Польщі.";
export const HERO_TEXT_END = "Це наша історія.";
export const EXPLORE = "Досліджуйте";
export const CHOR = "Chor";

export const CHOOSE_A_YEAR = "Виберіть рік";
// export const YEAR_SYMBOL = 'р'
export const SCROLL = "Прокрутка";

export const LIGHT = "Світла";
export const DARK = "Темна";
export const SYSTEM = "Системна";

export const GALLERY = "Галерея";
export const CONCERTS = "Концерти";

export const FUTURES = "Майбутні";
export const PAST = "Минулі";
export const EVENTS_HASH_ENDPOINT = "/event#";
// export const EVENTS_YEAR_QUERY_ENDPOINT = '/event?year='

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

export const DESIGNER_URL = "https://github.com/AMalenkij:";
