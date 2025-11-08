import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import BackButton from "@/components/BackButton";
import MediaGallery from "@/components/MediaGallery";
import { TypographyComponents } from "@/components/TypographyComponents";
import { Badge } from "@/components/ui/badge";
import { LOCALE_MAP } from "@/constants/i18n";
import { transformSanityMedia } from "@/lib/media";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { allEventsSlugsQuery, eventQuery } from "@/sanity/lib/queries";
import { type Locale } from "@/types/app";

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

function formatDateTime(date: string, locale: Locale, time?: string | null) {
  const dateFormatted = new Date(date).toLocaleDateString(LOCALE_MAP[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return time ? `${dateFormatted} о ${time}` : dateFormatted;
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
  const t = await getTranslations("Events");

  if (!eventData.data) return notFound();

  const { eventDescription, eventTitle, date, time, media } = eventData.data;

  const cleanMedia = transformSanityMedia(media);

  return (
    <main className="container mx-auto px-4 py-8 pt-20">
      <div className="mb-12">
        <BackButton title={t("backToEvents")} />
      </div>
      <header className="mb-6">
        <h1 className="font-accent font-bold text-5xl tracking-tight md:text-7xl">
          {eventTitle || t("noTitle")}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
          <span className="inline-flex items-center gap-1 uppercase">
            {formatDateTime(date, locale, time)}
          </span>
        </div>
        {eventData.tags && eventData.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {eventData.data.tags.map(({ _id, name }) => (
              <Badge key={_id} variant="secondary">
                {name}
              </Badge>
            ))}
          </div>
        )}
      </header>
      <div className=" flex flex-col-reverse lg:flex-row lg:gap-x-8">
        <article className="lg:w-5/12">
          <section>
            {eventDescription ? (
              <PortableText
                value={eventDescription as PortableTextBlock[]}
                components={TypographyComponents}
              />
            ) : (
              <p>{t("noDescription")}</p>
            )}
          </section>
        </article>
        <div className="mb-6 w-full lg:mb-0 lg:w-7/12">
          <MediaGallery media={cleanMedia} variant="eventPage" />
        </div>
      </div>
    </main>
  );
}
