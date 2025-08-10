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
    "imageUrl": imageFile.asset->url
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
      imageFile
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
    title,
    date,
    "eventDescription": eventDescription[$locale],
    "media": media[]->{
      imageFile,
      videoUrl,
    }
  }
`);
export const eventsQuery =
  defineQuery(`*[_type == "events" && references(*[_type == "tag" && (name == "major" || name == "minor")]._id)] | order(date desc) {
  _id,
  "eventTitle": eventTitle[$locale],
  slug,
  date,
  time,
  location->{
    title
  },
  "media": media[]->{
    imageFile,
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
    imageFile,
    videoUrl,
  },
  tags[]->{
    _id,
    name
  }
}`);
