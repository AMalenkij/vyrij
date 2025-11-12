import EventsPagination from "@/components/EventsPagination";
import SubHeader from "@/components/SubHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { eventsCountQuery, eventsQuery } from "@/sanity/lib/queries";
import { type Locale } from "@/types/app";
import { LOCALE_MAP } from "@/constants/i18n";
import { Tag } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import RenderPhoto from "@/components/RenderPhoto";

export const revalidate = 60;

const EVENTS_PER_PAGE = 6;

export async function generateStaticParams({
  params: { locale },
}: {
  params: { locale: Locale };
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

  const events = eventsData.data;
  const totalPages = Math.ceil(totalEvents.data / EVENTS_PER_PAGE);

  return (
    <main className="container mx-auto px-1">
      <SubHeader
        title={tEvents("title")}
        sectionName={tEvents("sectionName")}
        counter={totalEvents.data.toString()}
      />
      <section className="grid gap-6 lg:grid-cols-2">
        {events.map(({ tags, media, date, slug, eventTitle, _id }) => {
          const tagNames = tags?.slice(0, 4) || [];
          const firstMedia = media?.[0];
          const imageUrl =
            firstMedia?.type === "photo" && firstMedia.imageUrl
              ? firstMedia.imageUrl
              : null;
          const lqip =
            firstMedia?.type === "photo" && firstMedia.lqip
              ? firstMedia.lqip
              : null;
          const dimensions =
            firstMedia?.type === "photo" && firstMedia.dimensions
              ? firstMedia.dimensions
              : null;
          const videoUrl =
            firstMedia?.type === "video" && firstMedia.videoUrl
              ? firstMedia.videoUrl
              : null;
          const dateObj = new Date(date);
          const day = dateObj.getDate().toString().padStart(2, "0");
          const month = dateObj.toLocaleDateString(LOCALE_MAP[locale], {
            month: "short",
          });
          const year = dateObj.getFullYear().toString();
          const title = eventTitle || tEvents("noTitle");

          return (
            <Link key={_id} href={`/${locale}/events/${slug.current}`}>
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
                  {tagNames.length > 0 ? (
                    <div>
                      {tagNames.map(({ _id, name }) => (
                        <Badge key={_id} variant="secondary" className="mr-2">
                          <Tag className="h-3 w-3" />
                          {name}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
                <CardFooter className="p-0">
                  <div className="relative aspect-[16/9] w-full">
                    {videoUrl ? (
                      <iframe
                        className="aspect-video w-full"
                        src={videoUrl}
                        title={title}
                        allowFullScreen
                      />
                    ) : imageUrl ? (
                      <RenderPhoto
                        photoUrl={imageUrl}
                        alt={title}
                        lqip={lqip}
                        dimensions={dimensions ? dimensions : null}
                      />
                    ) : (
                      <div className="aspect-video w-full bg-muted"></div>
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
