import { type SchemaTypeDefinition } from "sanity";
import { tag } from "./tag";
import { events } from "./event";
import { location } from "./location";
import { media } from "./media";
import { localeBlockContent } from "./locale/localeBlockContent";
import { localeString } from "./locale/localeString";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // документы
    tag,
    events,
    location,
    media,
    // вспомогательные типы
    localeBlockContent,
    localeString,
  ],
};
