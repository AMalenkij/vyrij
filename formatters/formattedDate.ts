import { LOCALE_MAP } from "@/constants/i18n";
import type { Locale } from "@/types/app";

export interface FormattedDate {
  day: string;
  month: string;
  year: string;
}

export function formatDateShort(date: Date, locale: Locale): FormattedDate {
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleDateString(LOCALE_MAP[locale], {
    month: "short",
  });
  const year = date.getFullYear().toString();

  return { day, month, year };
}

export function formatDateLong(date: Date, locale: Locale): string {
  return date.toLocaleDateString(LOCALE_MAP[locale], {
    month: "long",
    day: "numeric",
  });
}
