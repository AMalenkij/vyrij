import { Tag } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import toAppEvents from "@/adapters/toAppEvents";
import EventsPagination from "@/components/EventsPagination";
import RenderPhoto from "@/components/RenderPhoto";
import SubHeader from "@/components/SubHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { LOCALE_MAP } from "@/constants/i18n";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { eventsCountQuery, eventsQuery } from "@/sanity/lib/queries";
import type { Locale } from "@/types/app";

export const revalidate = 60;

const EVENTS_PER_PAGE = 6;

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const totalEvents = await client.fetch(eventsCountQuery, {
    locale,
  });
  const totalPages = Math.ceil(totalEvents / EVENTS_PER_PAGE);

  const paths = [];
  for (let i = 1; i <= totalPages; i++) {
    paths.push({ page: i.toString() });
  }
  return paths;
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale; page: string }>;
}) {
  const { locale, page: pageString } = await params;
  const page = pageString ? parseInt(pageString, 10) : 1;
  const tEvents = await getTranslations("Events");

  const [eventsData, totalEvents] = await Promise.all([
    sanityFetch({
      query: eventsQuery,
      params: {
        locale,
        start: (page - 1) * EVENTS_PER_PAGE,
        end: page * EVENTS_PER_PAGE,
      },
    }),
    sanityFetch({
      query: eventsCountQuery,
      params: { locale },
    }),
  ]);

  const totalPages = Math.ceil(totalEvents.data / EVENTS_PER_PAGE);
  const eventTranslations = {
    noTitle: tEvents("noTitle"),
    noMedia: tEvents("noMedia"),
  };
  const events = toAppEvents(eventsData.data, eventTranslations);

  return (
    <main className="container mx-auto px-1">
      <SubHeader
        title={tEvents("title")}
        sectionName={tEvents("sectionName")}
        counter={totalEvents.data.toString()}
      />
      <section className="grid gap-6 lg:grid-cols-2">
        {events.map(({ id, title, date, slug, tags, media }) => {
          const day = date.getDate().toString().padStart(2, "0");
          const month = date.toLocaleDateString(LOCALE_MAP[locale], {
            month: "short",
          });
          const year = date.getFullYear().toString();
          const mediaItem = media?.[0];
          const hasVideo = mediaItem && "video" in mediaItem;
          const hasImage = mediaItem && "image" in mediaItem;

          return (
            <Link key={id} href={`/${locale}/events/${slug.current}`}>
              <Card className="flex flex-col overflow-hidden transition-all will-change-auto hover:scale-101">
                <CardContent className="px-4 py-2">
                  <div className="flex flex-row">
                    <div>
                      <div className="text-3xl md:text-4xl lg:w-20">{day}</div>
                      <div className="grid-cols-3 gap-y-1 lg:w-20">
                        <div className="text-xl">{month}</div>
                        <div className="text-xl">{year}</div>
                      </div>
                    </div>
                    <div className="flex items-center"></div>
                    <h3 className="h-16 font-semibold text-xl md:text-2xl lg:text-4xl ">
                      {title}
                    </h3>
                  </div>
                  <div>
                    {tags.map(({ id, name }) => (
                      <Badge key={id} variant="secondary" className="mr-2">
                        <Tag className="h-3 w-3" />
                        {name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-0">
                  <div className="relative aspect-[16/9] w-full">
                    {hasVideo ? (
                      <iframe
                        className="aspect-video w-full"
                        src={mediaItem.video.url}
                        title={title}
                        allowFullScreen
                      />
                    ) : hasImage ? (
                      <RenderPhoto
                        photoUrl={mediaItem.image.url}
                        alt={title}
                        lqip={mediaItem.image.lqip}
                        dimensions={mediaItem.image.dimensions}
                      />
                    ) : (
                      <div className="flex aspect-video w-full items-center justify-center bg-muted">
                        <span className="text-muted-foreground">
                          {eventTranslations.noMedia}
                        </span>
                      </div>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </section>
      <EventsPagination
        currentPage={page}
        totalPages={totalPages}
        locale={locale}
      />
    </main>
  );
}
