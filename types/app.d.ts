export type Locale = "en" | "ua" | "pl";

// A clean, unified media item type. Data transformation should happen BEFORE this component.
export type CleanMediaItem = {
  _id: string;
  type: "photo" | "video";
  url: string;
  title?: string;
};
