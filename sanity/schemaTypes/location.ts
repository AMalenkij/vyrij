import { defineType, defineField } from "sanity";

export const location = defineType({
  name: "location",
  title: "Location",
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
  ],
});
