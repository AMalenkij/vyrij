const FALLBACK_MESSAGE = "Event title or translation is missing.";

export default function toAppEventTitle(
  title: unknown,
  noTitleTranslation: string = FALLBACK_MESSAGE,
): string {
  if (typeof title === "string" && title.trim().length > 0) {
    return title;
  }
  return noTitleTranslation;
}
