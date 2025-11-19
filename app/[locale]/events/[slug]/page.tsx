import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import toAppEvent from "@/adapters/toAppEvent";
import toAppMedia from "@/adapters/toAppMedia";
import BackButton from "@/components/BackButton";
import MediaGallery from "@/components/MediaGallery";
import { TypographyComponents } from "@/components/TypographyComponents";
import { Badge } from "@/components/ui/badge";
import { LOCALE_MAP } from "@/constants/i18n";
import { formatDateShort } from "@/formatters/formattedDate";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import {
  allEventsSlugsQuery,
  eventMediaQuery,
  eventQuery,
} from "@/sanity/lib/queries";
import type { Locale } from "@/types/app";

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(allEventsSlugsQuery);
  const locales = Object.keys(LOCALE_MAP);

  return slugs.flatMap((slug) =>
    locales.map((locale) => ({
      slug: slug.slug,
      locale: locale,
    })),
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const eventData = await sanityFetch({
    query: eventQuery,
    params: { locale, slug },
  });

  const mediaData = await sanityFetch({
    query: eventMediaQuery,
    params: { locale, slug },
  });

  // adapter translations
  const t = await getTranslations("Events");
  const eventTranslations = {
    noTitle: t("noTitle"),
    noDescription: t("noDescription"),
  };

  const appEvent = toAppEvent(eventData.data, eventTranslations);
  if (appEvent === null) return notFound();

  const formattedDate = formatDateShort(appEvent.date, locale);
  return (
    <main className="container mx-auto px-4 py-8 pt-20">
      <div className="mb-12">
        <BackButton title={t("backToEvents")} />
      </div>
      <header className="mb-6">
        <h1 className="font-accent font-bold text-5xl tracking-tight md:text-7xl">
          {appEvent.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
          <span className="inline-flex items-center gap-1 uppercase">
            {formattedDate.day} {formattedDate.month} {formattedDate.year}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {appEvent.tags.map(({ id, name }) => (
            <Badge key={id} variant="secondary">
              {name}
            </Badge>
          ))}
        </div>
      </header>
      <div className=" flex flex-col-reverse lg:flex-row lg:gap-x-8">
        <article className="lg:w-5/12">
          <section>
            <PortableText
              value={appEvent.description}
              components={TypographyComponents}
            />
          </section>
        </article>
        <div className="mb-6 w-full lg:mb-0 lg:w-7/12">
          <MediaGallery
            media={toAppMedia(mediaData.data)}
            variant="eventPage"
          />
        </div>
      </div>
    </main>
  );
}
