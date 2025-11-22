import { ContactsCard } from "@/components/ContactsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/app";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Terms");

  const sectionsData = [
    {
      id: 1,
      key: "acceptance",
      title: t("sections.acceptance.title"),
      paragraphs: [t("sections.acceptance.paragraphs.0")],
    },
    {
      id: 2,
      key: "intellectualProperty",
      title: t("sections.intellectualProperty.title"),
      paragraphs: [t("sections.intellectualProperty.paragraphs.0")],
      list: [
        t("sections.intellectualProperty.list.0"),
        t("sections.intellectualProperty.list.1"),
        t("sections.intellectualProperty.list.2"),
        t("sections.intellectualProperty.list.3"),
      ],
      allowedTitle: t("sections.intellectualProperty.allowedTitle"),
      allowedList: [
        t("sections.intellectualProperty.allowedList.0"),
        t("sections.intellectualProperty.allowedList.1"),
      ],
      restrictedTitle: t("sections.intellectualProperty.restrictedTitle"),
      restrictedList: [
        t("sections.intellectualProperty.restrictedList.0"),
        t("sections.intellectualProperty.restrictedList.1"),
        t("sections.intellectualProperty.restrictedList.2"),
      ],
    },
    {
      id: 3,
      key: "mediaContent",
      title: t("sections.mediaContent.title"),
      subsections: [
        {
          id: "photosVideos",
          title: t("sections.mediaContent.subsections.photosVideos.title"),
          list: [
            t("sections.mediaContent.subsections.photosVideos.list.0"),
            t("sections.mediaContent.subsections.photosVideos.list.1"),
            t("sections.mediaContent.subsections.photosVideos.list.2"),
            t("sections.mediaContent.subsections.photosVideos.list.3"),
          ],
        },
        {
          id: "eventInfo",
          title: t("sections.mediaContent.subsections.eventInfo.title"),
          list: [
            t("sections.mediaContent.subsections.eventInfo.list.0"),
            t("sections.mediaContent.subsections.eventInfo.list.1"),
            t("sections.mediaContent.subsections.eventInfo.list.2"),
            t("sections.mediaContent.subsections.eventInfo.list.3"),
          ],
        },
      ],
    },
    {
      id: 4,
      key: "liability",
      title: t("sections.liability.title"),
      paragraphs: [t("sections.liability.paragraphs.0")],
      list: [
        t("sections.liability.list.0"),
        t("sections.liability.list.1"),
        t("sections.liability.list.2"),
      ],
    },
    {
      id: 5,
      key: "confidentiality",
      title: t("sections.confidentiality.title"),
      paragraphs: [t("sections.confidentiality.paragraphs.0")],
    },
    {
      id: 6,
      key: "changes",
      title: t("sections.changes.title"),
      paragraphs: [t("sections.changes.paragraphs.0")],
      list: [t("sections.changes.list.0"), t("sections.changes.list.1")],
    },
  ];

  return (
    <div className="container mx-auto pt-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-6 text-center">
          <h1 className="mb-4 text-4xl text-foreground">{t("header.title")}</h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">
              {t("header.effectiveLabel")} {t("header.effectiveDate")}
            </span>
          </div>
        </div>
      </div>

      {/* Terms Content */}
      <div className="space-y-6">
        {sectionsData.map((section) => (
          <Card key={section.key}>
            <CardHeader>
              <CardTitle className="text-card-foreground text-xl">
                {section.id}. {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6 text-muted-foreground">
              {section.paragraphs?.map((paragraph, index) => (
                <p key={`${section.key}-paragraph-${index}`}>{paragraph}</p>
              ))}

              {section.list && (
                <ul className="ml-4 list-inside list-disc space-y-2">
                  {section.list.map((item, index) => (
                    <li
                      key={`${section.key}-item-${index}`}
                      className="leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* Allowed / Restricted sections */}
              {section.allowedList && section.restrictedList && (
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {/* Allowed */}
                  <Card className="border border-border bg-secondary/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 font-semibold text-secondary-foreground">
                        <div className="h-2 w-2 rounded-full bg-secondary-foreground" />
                        {section.allowedTitle}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        {section.allowedList.map((item, index) => (
                          <li
                            key={`${section.key}-allowed-${index}`}
                            className="flex items-start gap-2"
                          >
                            <span className="mt-1 text-secondary-foreground">
                              ✓
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Restricted */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 font-semibold text-destructive">
                        <div className="h-2 w-2 rounded-full bg-destructive" />
                        {section.restrictedTitle}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        {section.restrictedList.map((item, index) => (
                          <li
                            key={`${section.key}-restricted-${index}`}
                            className="flex items-start gap-2"
                          >
                            <span className="mt-1 text-destructive">✗</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Subsections */}
              {Array.isArray(section.subsections) &&
                section.subsections.map((subsection) => (
                  <div
                    key={`${section.key}-${subsection.id}`}
                    className="mt-6 rounded-lg bg-muted p-4 text-muted-foreground"
                  >
                    <h4 className="mb-3 font-semibold text-foreground">
                      {subsection.title}
                    </h4>
                    {subsection.list && (
                      <ul className="ml-4 list-inside list-disc space-y-2">
                        {subsection.list.map((item, index) => (
                          <li
                            key={`${section.key}-${subsection.id}-item-${index}`}
                            className="leading-relaxed"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contacts Section */}
      <ContactsCard
        title={t("sections.contacts.title")}
        intro={t("sections.contacts.intro")}
        email={t("sections.contacts.email")}
        address={t("sections.contacts.address")}
      />
    </div>
  );
}
