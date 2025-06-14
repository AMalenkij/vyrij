import { type SchemaTypeDefinition } from "sanity";
import { tag } from "./tag";
import { events } from "./event";
import { location } from "./location";
import { media } from "./media";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [tag, events, location, media],
};
