import { defineType, defineField } from "sanity";

export const events = defineType({
  name: "events", // Имя схемы
  title: "Events", // Заголовок схемы в Studio
  type: "document", // Тип документа
  fields: [
    defineField({
      name: "title", // Имя поля
      title: "Название", // Заголовок для Studio
      type: "string", // Тип данных
      validation: (Rule) => Rule.required(), // Валидатор
    }),
    defineField({
      name: "slug", // Имя поля для slug
      title: "Slug", // Заголовок для Studio
      type: "slug", // Тип данных (slug)
      options: {
        source: "title", // Значение будет генерироваться на основе поля "title"
        maxLength: 96, // Максимальная длина slug
      },
      validation: (Rule) => Rule.required(), // Валидатор, который делает поле обязательным
    }),
    defineField({
      name: "description", // Имя поля для описания
      title: "Описание", // Заголовок
      type: "array", // Тип данных (blockContent, который мы только что создали)
      of: [{ type: "block" }],
    }),
    {
      title: "Date",
      name: "date",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
      validation: (Rule) => Rule.required(), // Валидатор
    },
    defineField({
      name: "time",
      title: "Time",
      type: "string",
      description: "Введите время в формате HH:mm, например, 14:30",
      placeholder: "HH:mm",
      validation: (Rule) =>
        Rule.regex(/^([01]\d|2[0-3]):[0-5]\d$/).error(
          "Пожалуйста, введите действительное время в формате HH:mm (00:00 до 23:59)",
        ),
    }),
    defineField({
      name: "location",
      title: "Локация",
      type: "reference",
      to: [{ type: "location" }],
    }),
    defineField({
      name: "media",
      title: "Медиа",
      type: "array",
      of: [{ type: "reference", to: [{ type: "media" }] }],
    }),
    defineField({
      name: "tags", // Имя поля для тегов
      title: "Теги", // Заголовок
      type: "array", // Тип данных (массив)
      of: [
        { type: "reference", to: [{ type: "tag" }] }, // Ссылка на тег
      ],
      validation: (Rule) => Rule.required(), // Валидатор
    }),
  ],
  // Конфигурация превью для Studio
  preview: {
    select: {
      title: "title",
      tag0: "tags.0.name",
      tag1: "tags.1.name",
      tag2: "tags.2.name",
    },
    prepare({ title, tag0, tag1, tag2 }) {
      const tags = [tag0, tag1, tag2].filter(Boolean);
      return {
        title: title,
        subtitle:
          tags.length > 0 ? tags.join(", ") + (tag2 ? "" : "...") : "Нет тегов",
      };
    },
  },
});
