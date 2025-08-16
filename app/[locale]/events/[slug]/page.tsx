import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/sanityImage";
import type { PortableTextBlock } from "@portabletext/types";
import { TypographyComponents } from "@/components/TypographyComponents";
import { PortableText } from "@portabletext/react";
import { eventQuery } from "@/sanity/lib/queries";
import { type Locale } from "@/types/app";
import { LOCALE_MAP } from "@/constants/i18n";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ROUTES_CONFIG } from "@/constants/routes";

type Props = {
  params: Promise<{ slug: string; locale: Locale }>;
};

function formatDateTime(date: string, locale: Locale, time?: string | null) {
  const dateFormatted = new Date(date).toLocaleDateString(LOCALE_MAP[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return time ? `${dateFormatted} о ${time}` : dateFormatted;
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const eventData = await sanityFetch({
    query: eventQuery,
    params: { locale, slug },
  });
  const t = await getTranslations("Events");

  if (!eventData.data) return notFound();

  const { eventDescription, eventTitle, date, time, media } = eventData.data;
  const firstMedia = media?.[0]?.imageFile;
  const imgUrl = firstMedia ? urlFor(firstMedia).url() : null;

  return (
    <main className="container mx-auto px-4 py-8 pt-20">
      <div className="mb-12">
        <Button asChild variant="ghost">
          <Link
            href={ROUTES_CONFIG.EVENTS}
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToEvents")}
          </Link>
        </Button>
      </div>
      <header className="mb-6">
        <h1 className="font-accent font-bold text-5xl tracking-tight md:text-7xl">
          {eventTitle && <span className="mr-2">{t("noTitle")}</span>}
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
      <div className=" flex flex-col-reverse lg:flex-row lg:gap-x-10">
        <article className="lg:w-2/3">
          <section className="prose prose-gray dark:prose-invert max-w-none">
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
        <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden">
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={eventTitle || ""}
              fill
              sizes="100vw"
              className="max-h-screen object-cover"
              priority
            />
          ) : null}
        </div>
      </div>
    </main>
  );
}
