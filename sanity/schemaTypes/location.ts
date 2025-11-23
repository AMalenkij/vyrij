import { defineType, defineField } from "sanity";

export const location = defineType({
  name: "location",
  title: "Локації",
  type: "document",
  description: "Місця проведення подій: концертні зали, церкви, студії звукозапису та інші локації",
  fields: [
    defineField({
      name: "place",
      title: "Назва місця",
      description: "Назва локації (наприклад, 'Національна філармонія України')",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "address",
      title: "Адреса",
      description: "Повна адреса місця проведення події",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
