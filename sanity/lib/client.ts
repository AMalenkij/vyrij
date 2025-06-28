import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId, // ID вашего проекта Sanity
  dataset, // Название набора данных (например "production")
  apiVersion, // Версия API (формат "YYYY-MM-DD")
  useCdn: true, // Использовать ли CDN для запросов
});
