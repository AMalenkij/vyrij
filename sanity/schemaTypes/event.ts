import { defineType, defineField } from "sanity";

export const events = defineType({
  name: "events",
  title: "Events",
  type: "document",
  description:
    "Події хору: концерти, записи, внутрішні моменти колективу та інші значущі події в житті хорового колективу",
  fields: [
    defineField({
      name: "eventTitle",
      title: "Назва події (для генерації slug)",
      description:
        "Основна назва події (використовується для відображення та генерації посилання)",
      type: "localeString",
      validation: (Rule) =>
        Rule.fields({
          ua: (fieldRule) => fieldRule.required(),
          en: (fieldRule) => fieldRule.required(),
          pl: (fieldRule) => fieldRule.required(),
        }),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "Унікальна частина URL. Автоматично генерується з англійської назви події",
      options: {
        source: "eventTitle.en", // Источник - английская версия названия
        maxLength: 96, // Максимальная длина slug
      },
      validation: (Rule) => Rule.required(), // Валидатор, который делает поле обязательным
    }),
    defineField({
      name: "eventDescription",
      title: "Описание",
      description: "Детальний опис події з підтримкою форматування та медіа",
      type: "localeBlockContent",
    }),
    defineField({
      name: "date",
      title: "Дата",
      description: "Дата проведення події",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "time",
      title: "Час",
      description: "Час початку події у форматі HH:mm (наприклад, 14:30)",
      type: "string",
      placeholder: "HH:mm",
      validation: (Rule) =>
        Rule.regex(/^([01]\d|2[0-3]):[0-5]\d$/).error(
          "Будь ласка, введіть дійсний час у форматі HH:mm (00:00 до 23:59)",
        ),
    }),
    defineField({
      name: "location",
      title: "Локація",
      description: "Місце проведення події (посилання на локацію)",
      type: "reference",
      to: [{ type: "location" }],
    }),
    defineField({
      name: "media",
      title: "Медіа",
      description: "Фотографії, відео пов'язані з подією",
      type: "array",
      of: [{ type: "reference", to: [{ type: "media" }] }],
    }),
    defineField({
      name: "tags",
      title: "Теги",
      type: "array",
      description: "Категорії або ключові слова для класифікації події",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  // Конфигурация превью для Studio
  preview: {
    select: {
      eventTitle: "eventTitle.ua",
      date: "date",
      time: "time",
      tag0: "tags.0.name",
      tag1: "tags.1.name",
      tag2: "tags.2.name",
    },
    prepare({ eventTitle, date, time, tag0, tag1, tag2 }) {
      // Собираем все теги которые есть
      const tags = [tag0, tag1, tag2].filter(Boolean);

      // Форматируем дату
      const dateFormatted = date
        ? new Date(date).toLocaleDateString("uk-UA", {
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
        title: eventTitle,
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
