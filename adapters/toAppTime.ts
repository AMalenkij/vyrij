const FALLBACK_MESSAGE = "Time is missing.";

export default function toAppTime(
  time: unknown,
  noTimeTranslation: string = FALLBACK_MESSAGE,
): string {
  if (typeof time === "string" && time.trim().length > 0) {
    return time;
  }
  return noTimeTranslation;
}
