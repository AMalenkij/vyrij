import { defineType, defineField } from "sanity";

export const media = defineType({
  name: "media",
  title: "Media",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Photo", value: "photo" },
          { title: "Video", value: "video" },
          { title: "External URL", value: "url" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imageFile",
      title: "Image File",
      type: "image",
      options: {
        hotspot: true,
      },
      hidden: ({ document }) => document?.type !== "photo",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const document = context.document;
          if (document?.type === "photo" && !value) {
            return "Image file is required for photo type";
          }
          return true;
        }),
    }),
    // Условное поле для видео файла
    defineField({
      name: "videoFile",
      title: "Video File",
      type: "file",
      options: {
        accept: "video/*",
      },
      hidden: ({ document }) => document?.type !== "video",
    }),
    // Условное поле для YouTube/Vimeo URL
    defineField({
      name: "videoUrl",
      title: "Video URL (YouTube/Vimeo)",
      type: "url",
      hidden: ({ document }) => document?.type !== "video",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const document = context.document;
          if (document?.type === "video" && !value && !document?.videoFile) {
            return "Either video file or video URL is required for video type";
          }
          return true;
        }),
    }),
    // Условное поле для внешних URL
    defineField({
      name: "externalUrl",
      title: "External URL",
      type: "url",
      hidden: ({ document }) => document?.type !== "url",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const document = context.document;
          if (document?.type === "url" && !value) {
            return "External URL is required for URL type";
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
      return {
        title: title || "Untitled Media",
        subtitle: type ? type.toUpperCase() : "No Type",
        media: media,
      };
    },
  },
});
