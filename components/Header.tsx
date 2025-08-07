import Navigation from "@/components/Navigation";
import Logo from "@/components/ui/Logo";
import { ROUTES_CONFIG } from "@/constants/routes";
import { useTranslations } from "next-intl";
import LanguageToggle from "@/components/LanguageToggle";
import ModeToggle from "@/components/ModeToggle";
import ClientSheet from "@/components/ClientSheet";
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import SocialMediaSection from "@/components/SocialLink";

export default function Header() {
  const tNavMenu = useTranslations("Nav");
  const tLanguageToggle = useTranslations("Header.LanguageToggle");
  const tModeToggle = useTranslations("Header.ModeToggle");
  const tMobileMenu = useTranslations("Header.MobileMenu");
  const tFooter = useTranslations("Footer");

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
  ];

  return (
    <header className="container sticky inset-x-1 top-0 z-100 mx-auto flex items-center justify-between px-1 py-2 md:px-0 md:py-4">
      <Logo />
      <nav className="hidden items-center space-x-2 md:flex">
        <Navigation routes={routes} className="hidden gap-4 md:flex" />
        <div className="flex items-center space-x-2 pl-4">
          <ModeToggle
            variant="dropdown"
            lightLabel={tModeToggle("lightLabel")}
            darkLabel={tModeToggle("darkLabel")}
            systemLabel={tModeToggle("systemLabel")}
            toggleTheme={tModeToggle("toggleTheme")}
          />
          <LanguageToggle
            variant="dropdown"
            englishLabel={tLanguageToggle("english")}
            polishLabel={tLanguageToggle("polski")}
            ukrainianLabel={tLanguageToggle("ukrainian")}
            changeLanguageLabel={tLanguageToggle("changeLanguage")}
          />
        </div>
      </nav>
      <ClientSheet>
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <SheetDescription>{tMobileMenu("SheetDescription")}</SheetDescription>
        </SheetHeader>

        <LanguageToggle
          variant="accordion"
          englishLabel={tLanguageToggle("english")}
          polishLabel={tLanguageToggle("polski")}
          ukrainianLabel={tLanguageToggle("ukrainian")}
          changeLanguageLabel={tLanguageToggle("changeLanguage")}
        />
        <ModeToggle
          variant="accordion"
          lightLabel={tModeToggle("lightLabel")}
          darkLabel={tModeToggle("darkLabel")}
          systemLabel={tModeToggle("systemLabel")}
          toggleTheme={tModeToggle("toggleTheme")}
        />

        {/* Nav */}
        <div className="mb-10 space-y-1 md:space-y-4">
          <h3 className="font-medium text-sm uppercase tracking-wide opacity-80">
            {tFooter("navigation.title")}
          </h3>
          <Navigation routes={routes} className="flex flex-col gap-4" />
        </div>

        <SocialMediaSection />
      </ClientSheet>
    </header>
  );
}
