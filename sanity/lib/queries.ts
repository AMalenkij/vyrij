import { defineQuery } from "next-sanity";

export const IMAGE_FIELDS = `
  "id": _id,
  "alt": title,
  "url": imageFile.asset->url,
  "lqip": imageFile.asset->metadata.lqip,
  "dimensions": imageFile.asset->metadata.dimensions
`;
export const LOCATION_FIELDS = `
  "location": location->{
    place,
    address,
  }
`;

export const EVENT_TITLE_FIELD = `"title": eventTitle[$locale]`;

export const BASE_EVENT_FIELDS = `
  "id": _id,
  ${EVENT_TITLE_FIELD},
  date,
  time,
  ${LOCATION_FIELDS}
`;

export const IMAGE_PROJECTION = `
  "image": {
    ${IMAGE_FIELDS}
  }
`;

const VIDEO_PROJECTION = `
  "video": {
    "id": _id,
    "alt": title,
    "url": coalesce(videoUrl, videoFile.asset->url, externalUrl)
  }
`;

export const galleryPhotosQuery = defineQuery(`
  *[_type == "media" && type == "photo" && defined(imageFile.asset)] {
    ${IMAGE_PROJECTION}
  }
`);

export const futureEventsQuery =
  defineQuery(`*[_type == "events" && references(*[_type == "tag" && name == "concert"]._id) && date >= now()] {
    ${BASE_EVENT_FIELDS}
  }`);

export const pastEventsQuery =
  defineQuery(`*[_type == "events" && references(*[_type == "tag" && name == "concert"]._id) && date < now()] | order(date desc) {
    ${BASE_EVENT_FIELDS}
  }`);

export const galleryPhotosCountQuery = defineQuery(
  `count(*[_type == "media" && type == "photo" && defined(imageFile.asset)])`,
);

export const majorEventsQuery = defineQuery(`
  *[_type == "events" && references(*[_type == "tag" && name == "major"]._id)] | order(date asc) {
  "id": _id,
  "title": eventTitle[$locale],
  date,
  "media": media[]->{
    ...select(type == 'photo' => {
      ${IMAGE_PROJECTION}
    })
  },
  }
`);

export const minorEventsQuery = defineQuery(`
  *[_type == "events" && references(*[_type == "tag" && name == "minor" || name == "major"]._id)] | order(date asc) {
  "id": _id,
  "description": eventDescription[$locale],
  date,
  "media": media[]->{
    ...select(type == 'photo' => {
      ${IMAGE_PROJECTION}
    }),
    ...select(type == 'video' => {
      ${VIDEO_PROJECTION}
    })
  },
  }
`);

export const majorEventsYearsQuery = defineQuery(`
  *[_type == "events" && references(*[_type == "tag" && name == "major"]._id)] | order(date asc) {
    date
  }
`);

export const eventsCountQuery = defineQuery(
  `count(*[_type == "events" && references(*[_type == "tag" && (name == "major" || name == "minor")]._id)])`,
);

export const eventsQuery = defineQuery(`
  *[_type == "events" && references(*[_type == "tag" && (name == "major" || name == "minor")]._id)]
  | order(date desc) [$start...$end] {
    "id": _id,
    "title": eventTitle[$locale],
    slug,
    date,
    "tags": tags[]->{
      "id": _id,
      name
    },
    "media": media[0]->{
      ...select(type == 'photo' => {
        ${IMAGE_PROJECTION}
      }),
      ...select(type == 'video' => {
        ${VIDEO_PROJECTION}
      })
    }
}`);

export const eventQuery =
  defineQuery(`*[_type == "events" && slug.current == $slug][0]{
  "id": _id,
  "title": eventTitle[$locale],
  "description": eventDescription[$locale],
  date,
  "tags": tags[]->{
    "id": _id,
    name
  }
}`);

export const eventMediaQuery =
  defineQuery(`*[_type == "events" && slug.current == $slug][0]{
  "media": media[]->{
    ...select(type == 'photo' => {
      ${IMAGE_PROJECTION}
    }),
    ...select(type == 'video' => {
      ${VIDEO_PROJECTION}
    })
  }
}`);

export const allEventsSlugsQuery = defineQuery(
  `*[_type == "events" && defined(slug.current)]{ "slug": slug.current }`,
);
