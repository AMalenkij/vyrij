import { defineType, defineField } from "sanity";
import { TagIcon } from "@sanity/icons";

export const tag = defineType({
  name: "tag",
  title: "Теги",
  type: "document",
  icon: TagIcon,
  description: "Категорії та ключові слова для класифікації подій (концерт, запис, репетиція тощо)",
  fields: [
    defineField({
      name: "name",
      title: "Назва тегу",
      description: "Коротка назва категорії або ключового слова (наприклад, 'Концерт', 'Запис')",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
