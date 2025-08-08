import { defineType } from "sanity";
import { supportedLanguages } from "./supportedLanguages";

export const localeString = defineType({
  title: "Локалізований текст",
  name: "localeString",
  type: "object",
  fieldsets: [
    {
      title: "Переклади (інші мови)",
      name: "translations",
      description: "Тут можна додати переклади для інших мов",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: "string",
    fieldset: lang.isDefault ? undefined : "translations",
  })),
});
