import { defineQuery } from "next-sanity";

export const futureEventsQuery =
  defineQuery(`*[_type == "events" && references(*[_type == "tag" && name == "concert"]._id) && date >= now()] {
    _id,
    "eventTitle": eventTitle[$locale],
    date,
    time,
    "location": location->{
      place,
      address,
    }
  }`);

export const pastEventsQuery =
  defineQuery(`*[_type == "events" && references(*[_type == "tag" && name == "concert"]._id) && date < now()] | order(date desc) {
    _id,
    "eventTitle": eventTitle[$locale],
    date,
    time,
    "location": location->{
      place,
      address,
    }
  }`);

export const futureEventsCountQuery = defineQuery(
  `count(*[_type == "events" && references(*[_type == "tag" && name == "concert"]._id) && date >= now()])`,
);

export const pastEventsCountQuery = defineQuery(
  `count(*[_type == "events" && references(*[_type == "tag" && name == "concert"]._id) && date < now()])`,
);

export const galleryPhotosQuery = defineQuery(`
  *[_type == "media" && type == "photo" && defined(imageFile.asset)] {
    _id,
    title,
    "image": {
      "url": imageFile.asset->url,
      "lqip": imageFile.asset->metadata.lqip,
      "dimensions": imageFile.asset->metadata.dimensions
    }
  }
`);

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
