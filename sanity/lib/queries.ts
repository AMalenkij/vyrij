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
    _id,
    "eventTitle": eventTitle[$locale],
    date,
    "media": media[]->{
      imageFile,
      _id,
      "imageUrl": imageFile.asset->url,
      "lqip": imageFile.asset->metadata.lqip,
      "dimensions": imageFile.asset->metadata.dimensions
    }
  }
`);

export const majorEventsYearsQuery = defineQuery(`
  *[_type == "events" && references(*[_type == "tag" && name == "major"]._id)] | order(date asc) {
    date
  }
`);

export const minorEventsQuery = defineQuery(`
  *[_type == "events" && references(*[_type == "tag" && name == "minor" || name == "major"]._id)] | order(date asc) {
    _id,
    "eventTitle": eventTitle[$locale],
    date,
    "eventDescription": eventDescription[$locale],
    "media": media[]->{
      _id,
      "imageUrl": imageFile.asset->url,
      "lqip": imageFile.asset->metadata.lqip,
      "dimensions": imageFile.asset->metadata.dimensions,
      videoUrl,
      imageFile
    }
  }
`);

export const eventsCountQuery = defineQuery(
  `count(*[_type == "events" && references(*[_type == "tag" && (name == "major" || name == "minor")]._id)])`,
);

export const eventsQuery =
  defineQuery(`*[_type == "events" && references(*[_type == "tag" && (name == "major" || name == "minor")]._id)] | order(date desc) [$start...$end] {
  _id,
  "eventTitle": eventTitle[$locale],
  slug,
  date,
  time,
  location->{
    title
  },
  "media": media[]->{
    _id,
    title,
    type,
    "imageUrl": imageFile.asset->url,
    "lqip": imageFile.asset->metadata.lqip,
    "dimensions": imageFile.asset->metadata.dimensions,
    videoUrl,
  },
  tags[]->{
    _id,
    name
  }
}`);

export const eventQuery =
  defineQuery(`*[_type == "events" && slug.current == $slug][0]{
  _id,
  "eventTitle": eventTitle[$locale],
  "eventDescription": eventDescription[$locale],
  date,
  time,
  location->{
    title,
    url
  },
  "media": media[]->{
    _id,
    title,
    type,
    "imageUrl": imageFile.asset->url,
    "lqip": imageFile.asset->metadata.lqip,
    "dimensions": imageFile.asset->metadata.dimensions,
    videoUrl,
  },
  tags[]->{
    _id,
    name
  }
}`);

export const allEventsSlugsQuery = defineQuery(
  `*[_type == "events" && defined(slug.current)]{ "slug": slug.current }`,
);
