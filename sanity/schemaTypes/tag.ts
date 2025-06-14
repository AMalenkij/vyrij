import { defineType, defineField } from "sanity";
import { TagIcon } from "@sanity/icons";

export const tag = defineType({
  name: "tag", // Имя схемы
  title: "Tag", // Заголовок схемы в Studio
  type: "document", // Это документ, который можно создать в Sanity Studio
  icon: TagIcon,
  fields: [
    // Поле "name" для названия тега
    defineField({
      name: "name", // Имя поля в документе
      title: "Название", // Заголовок для поля в Studio
      type: "string", // Тип данных поля (строка)
      validation: (Rule) => Rule.required(), // Валидатор, который делает поле обязательным
    }),
  ],
});
