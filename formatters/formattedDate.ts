import { LOCALE_MAP } from "@/constants/i18n";
import { type Locale } from "@/types/app";

export interface FormattedDate {
  day: string;
  month: string;
  year: string;
}

export default function formatDate(
  date: string,
  locale: Locale,
): FormattedDate {
  const dateObj = new Date(date);

  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = dateObj.toLocaleDateString(LOCALE_MAP[locale], {
    month: "short",
  });
  const year = dateObj.getFullYear().toString();

  return { day, month, year };
}
