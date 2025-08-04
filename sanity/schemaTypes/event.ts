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
      date: "date",
      time: "time",
      // Правильный способ - для первого тега из массива
      tag0: "tags.0.name",
      tag1: "tags.1.name",
      tag2: "tags.2.name",
    },
    prepare({ title, date, time, tag0, tag1, tag2 }) {
      // Собираем все теги которые есть
      const tags = [tag0, tag1, tag2].filter(Boolean);

      // Форматируем дату
      const dateFormatted = date
        ? new Date(date).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })
        : "";

      // Объединяем дату и время
      const dateTime = time ? `${dateFormatted} в ${time}` : dateFormatted;

      // Объединяем теги
      const tagsText =
        tags.length > 0
          ? tags.join(", ") +
            (tags.length === 3 && tag2 ? "" : tags.length >= 3 ? "..." : "")
          : "";

      // Формируем subtitle: дата + теги
      let subtitle = "";
      if (dateTime && tagsText) {
        subtitle = `${dateTime} • ${tagsText}`;
      } else if (dateTime) {
        subtitle = dateTime;
      } else if (tagsText) {
        subtitle = tagsText;
      } else {
        subtitle = "Нет даты и тегов";
      }

      return {
        title: title,
        subtitle: subtitle,
      };
    },
  }, // Добавляем сортировку по дате (от новых к старым)
  orderings: [
    {
      title: "По дате (новые первые)",
      name: "dateDesc",
      by: [
        { field: "date", direction: "desc" },
        { field: "time", direction: "desc" },
      ],
    },
    {
      title: "По дате (старые первые)",
      name: "dateAsc",
      by: [
        { field: "date", direction: "asc" },
        { field: "time", direction: "asc" },
      ],
    },
    {
      title: "По названию",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
