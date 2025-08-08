import { defineType } from "sanity";
import { supportedLanguages } from "./supportedLanguages";

export const localeBlockContent = defineType({
  name: "localeBlockContent",
  type: "object",
  title: "Локалізований блок контенту",
  fieldsets: [
    {
      title: "Переклади (інші мови)",
      name: "translations",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: "array",
    of: [{ type: "block" }],
    fieldset: lang.isDefault ? undefined : "translations",
  })),
});
