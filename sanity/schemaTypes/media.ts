import { defineType, defineField } from "sanity";

export const media = defineType({
  name: "media",
  title: "Медіа",
  type: "document",
  description: "Фотографії, відео та інші медіа-файли, пов'язані з подіями хору",
  fields: [
    defineField({
      name: "title",
      title: "Назва",
      description: "Назва медіа-файлу для ідентифікації в системі",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Тип медіа",
      description: "Оберіть тип медіа-контенту",
      type: "string",
      options: {
        list: [
          { title: "Фото", value: "photo" },
          { title: "Відео", value: "video" },
          { title: "Зовнішнє посилання", value: "url" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imageFile",
      title: "Файл зображення",
      description: "Завантажте фотографію (підтримуються JPG, PNG, WebP)",
      type: "image",
      options: {
        hotspot: true,
        metadata: ["lqip"],
      },
      hidden: ({ document }) => document?.type !== "photo",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const document = context.document;
          if (document?.type === "photo" && !value) {
            return "Файл зображення обов'язковий для типу 'Фото'";
          }
          return true;
        }),
    }),
    defineField({
      name: "videoFile",
      title: "Відео файл",
      description: "Завантажте відео файл (MP4, MOV, AVI тощо)",
      type: "file",
      options: {
        accept: "video/*",
      },
      hidden: ({ document }) => document?.type !== "video",
    }),
    defineField({
      name: "videoUrl",
      title: "Посилання на відео (YouTube/Vimeo)",
      description: "Вставте посилання на відео з YouTube або Vimeo",
      type: "url",
      hidden: ({ document }) => document?.type !== "video",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const document = context.document;
          if (document?.type === "video" && !value && !document?.videoFile) {
            return "Потрібно вказати або файл відео, або посилання на відео";
          }
          return true;
        }),
    }),
    defineField({
      name: "externalUrl",
      title: "Зовнішнє посилання",
      description: "Посилання на зовнішній ресурс",
      type: "url",
      hidden: ({ document }) => document?.type !== "url",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const document = context.document;
          if (document?.type === "url" && !value) {
            return "Зовнішнє посилання обов'язкове для типу 'Зовнішнє посилання'";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      type: "type",
      media: "imageFile",
    },
    prepare(selection) {
      const { title, type, media } = selection;
      const typeLabels: Record<string, string> = {
        photo: "ФОТО",
        video: "ВІДЕО",
        url: "ПОСИЛАННЯ",
      };
      return {
        title: title || "Без назви",
        subtitle: type ? typeLabels[type] || type.toUpperCase() : "Без типу",
        media: media,
      };
    },
  },
});
