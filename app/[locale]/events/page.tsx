import SubHeader from "@/components/SubHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { sanityFetch } from "@/sanity/lib/live";
import { eventsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/sanityImage";
import { type Locale } from "@/types/app";
import { LOCALE_MAP } from "@/constants/i18n";
import { Tag } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const tEvents = await getTranslations("Events");
  const eventsData = await sanityFetch({
    query: eventsQuery,
    params: { locale },
  });

  const events = eventsData.data;

  return (
    <main className="container mx-auto px-1">
      <SubHeader
        title={tEvents("title")}
        sectionName={tEvents("sectionName")}
        counter={events.length.toString()}
      />

      <section className="grid gap-6 lg:grid-cols-2">
        {events.map(({ tags, media, date, slug, eventTitle, _id }) => {
          const tagNames = tags?.slice(0, 4) || [];
          const imageFile = media?.[0].imageFile;
          const imageUrl = imageFile ? urlFor(imageFile).url() : null;
          const videoUrl = media?.[0].videoUrl;
          const dateObj = new Date(date);
          const day = dateObj.getDate().toString().padStart(2, "0");
          const month = dateObj.toLocaleDateString(LOCALE_MAP[locale], {
            month: "short",
          });
          const year = dateObj.getFullYear().toString();
          const title = eventTitle || tEvents("noTitle");

          return (
            <Link key={_id} href={`events/${slug.current}`}>
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
                </CardContent>
                <CardFooter className="p-0">
                  <div className="relative aspect-[16/9] w-full">
                    {tagNames.length > 0 ? (
                      <div className="absolute top-3 left-3 z-50">
                        {tagNames.map(({ _id, name }) => (
                          <Badge
                            key={_id}
                            variant="secondary"
                            className="mx-1 gap-2"
                          >
                            <Tag className="h-3 w-3" />
                            {name}
                          </Badge>
                        ))}
                      </div>
                    ) : null}

                    {videoUrl ? (
                      <iframe
                        className="aspect-video w-full"
                        src={videoUrl}
                        title="YouTube video player"
                        allowFullScreen
                      />
                    ) : null}

                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                        priority={false}
                      />
                    ) : null}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
