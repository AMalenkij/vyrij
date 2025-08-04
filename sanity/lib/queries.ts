import { defineQuery } from "next-sanity";

export const futureEventsQuery =
  defineQuery(`*[_type == "events" && references(*[_type == "tag" && name == "concert"]._id) && date >= now()] {
    _id,
    title,
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
    title,
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
    title,
    date,
     "media": media[]->{
       imageFile
     }
  }
`);

export const minorEventsQuery = defineQuery(`
  *[_type == "events" && references(*[_type == "tag" && name == "minor" || name == "major"]._id)] | order(date asc) {
    _id,
    title,
    date,
    description,
    "media": media[]->{
      imageFile,
      videoUrl,
    }
  }
`);
