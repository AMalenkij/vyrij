import { type AppEvent as AppMajorEvent } from "@/adapters/toAppMajorEvents";
import { type AppEvent as AppMinorEvent } from "@/adapters/toAppMinorEvents";

export type AppEventsByYear = {
  year: string;
  majorEvent: AppMajorEvent | null;
  minorEvents: AppMinorEvent[];
};

/**
 * Adapter for combining major and minor events into a year-based structure.
 * Accepts already cleaned data.
 *
 * @param majorEvents - Array of major events (1 expected per year)
 * @param minorEvents - Array of minor events
 * @returns An array of events grouped by year and sorted in ascending order
 */
export default function toAppEventsByYear(
  majorEvents: AppMajorEvent[],
  minorEvents: AppMinorEvent[],
): AppEventsByYear[] {
  const groupsMap = new Map<string, AppEventsByYear>();

  // Helper function to get or create a year group
  const getYearGroup = (year: string): AppEventsByYear => {
    let group = groupsMap.get(year);
    if (!group) {
      group = {
        year,
        majorEvent: null,
        minorEvents: [],
      };
      groupsMap.set(year, group);
    }
    return group;
  };

  // 1. Process Major Events
  majorEvents.forEach((event) => {
    const year = new Date(event.date).getFullYear().toString();
    const group = getYearGroup(year);

    // If two come in suddenly, this assignment will overwrite the previous one (the last one wins).
    group.majorEvent = event;
  });

  // 2. Process Minor Events
  minorEvents.forEach((event) => {
    const year = new Date(event.date).getFullYear().toString();
    const group = getYearGroup(year);

    group.minorEvents.push(event);
  });

  return Array.from(groupsMap.values()).sort(
    (a, b) => Number(a.year) - Number(b.year),
  );
}
