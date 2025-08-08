import EventsTimeline from "@/components/EventsTimeline";
import { type Locale } from "@/types/app";

export default async function Events({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <EventsTimeline locale={locale} />;
}
