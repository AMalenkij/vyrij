import type { StructureResolver } from "sanity/structure";
import { CalendarIcon, ImagesIcon, PinIcon, TagIcon } from "@sanity/icons";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Контент")
    .items([
      // Події
      S.listItem()
        .title("Події")
        .icon(CalendarIcon)
        .child(
          S.documentTypeList("events")
            .title("Події")
            .filter('_type == "events"')
        ),

      S.divider(),

      // Медіа
      S.listItem()
        .title("Медіа")
        .icon(ImagesIcon)
        .child(S.documentTypeList("media").title("Медіа")),

      S.divider(),

      // Довідники
      S.listItem()
        .title("Довідники")
        .child(
          S.list()
            .title("Довідники")
            .items([
              S.listItem()
                .title("Локації")
                .icon(PinIcon)
                .child(S.documentTypeList("location").title("Локації")),

              S.listItem()
                .title("Теги")
                .icon(TagIcon)
                .child(S.documentTypeList("tag").title("Теги")),
            ])
        ),
    ]);
