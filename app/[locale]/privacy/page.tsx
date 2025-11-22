import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, Shield, Eye, Users } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactsCard } from "@/components/ContactsCard";
import type { Locale } from "@/types/app";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Privacy");

  const sectionsData = [
    {
      id: 1,
      key: "general",
      title: t("sections.general.title"),
      text: t("sections.general.text"),
      icon: Shield,
    },
    {
      id: 2,
      key: "notCollected",
      title: t("sections.notCollected.title"),
      items: [
        t("sections.notCollected.items.0"),
        t("sections.notCollected.items.1"),
        t("sections.notCollected.items.2"),
      ],
      icon: Eye,
    },
    {
      id: 3,
      key: "images",
      title: t("sections.images.title"),
      intro: t("sections.images.intro"),
      list: [
        t("sections.images.list.0"),
        t("sections.images.list.1"),
        t("sections.images.list.2"),
      ],
      email: t("sections.images.email"),
      note: t("sections.images.note"),
      icon: Users,
    },
    {
      id: 4,
      key: "gdpr",
      title: t("sections.gdpr.title"),
      intro: t("sections.gdpr.intro"),
      list: [t("sections.gdpr.list.0"), t("sections.gdpr.list.1")],
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 font-bold text-4xl text-foreground">
            {t("header.title")}
          </h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{t("header.lastUpdate")}</span>
          </div>
        </div>

        <div className="space-y-6">
          {sectionsData.map((section) => (
            <Card key={section.key}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>{section.id}.</span>
                  {section.icon && <section.icon className="h-5 w-5" />}
                  <span>{section.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {section.text && (
                  <p className="text-foreground leading-relaxed">
                    {section.text}
                  </p>
                )}

                {section.items && (
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <Badge variant="secondary" className="text-xs">
                          ❌
                        </Badge>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.intro && (
                  <p className="mb-4 text-foreground">{section.intro}</p>
                )}

                {section.list && (
                  <ul className="mb-4 space-y-2 text-foreground">
                    {section.list.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                )}

                {section.email && section.note && (
                  <div className="rounded-lg bg-muted p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <code className="font-mono text-sm">{section.email}</code>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {section.note}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          <ContactsCard
            title={t("sections.contacts.title")}
            intro={t("sections.contacts.intro")}
            email={t("sections.contacts.email")}
            address={t("sections.contacts.address")}
          />
        </div>
      </div>
    </div>
  );
}
