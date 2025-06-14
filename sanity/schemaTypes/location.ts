import { defineType, defineField } from "sanity";

export const location = defineType({
  name: "location", // имя схемы (лучше не использовать "events", если это именно Location)
  title: "Location", // заголовок схемы в Sanity Studio
  type: "document",
  fields: [
    defineField({
      name: "place",
      title: "Место",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "address",
      title: "Адрес",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "city",
      title: "Город",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "url",
      title: "Ссылка",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
  ],
});
